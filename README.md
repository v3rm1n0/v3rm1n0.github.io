# portfolio

Personal site for v3rm1n.dev. Single page, static, no backend, no third-party
requests.

## Develop

Node comes from `shell.nix`; there is no system Node on NixOS.

```bash
nix-shell --run "npm install"
nix-shell --run "npm run dev"
```

If `nix-shell` fails with `executing shell '/scripts/buildShellShim'`, your shell
wraps it in a function — use `command nix-shell` instead.

## Test

```bash
nix-shell --run "npm run test"
```

## Build

```bash
nix-shell --run "npm run build"
```

This runs `tsc --noEmit` and then `vite build`. Output lands in `dist/`.

Note that type errors in *test* files break the build while the test suite stays
green, so run the build — not just the tests — before deploying.

## Deploy

Copy the build into the LXC and let Caddy serve it:

```bash
rsync -av --delete dist/ root@<container>:/var/www/portfolio/
```

`Caddyfile` in this repo is the server config. It terminates TLS, sets the
security headers, caches hashed assets for a year, and marks `content.json`
`no-cache`.

## Edit content

All site content lives in one file: `public/content.json` in this repo, which is
copied verbatim to `dist/content.json` and served as
`/var/www/portfolio/content.json`.

It is fetched at runtime, so **editing it in the container needs no rebuild and
no redeploy** — edit the file, reload the page.

### Before launch

Search the file for `PLACEHOLDER`. Those strings are the ones only you can
write: the tagline, the meta description, the two About paragraphs, and the
`dotfiles` project description. Everything else is filled in from verified
public data.

### Adding a project

Append one object to the `projects` array:

```json
{
  "id": "unique-slug",
  "name": "Display name",
  "tagline": "One short line",
  "description": "A sentence or two.",
  "language": "Rust",
  "tags": ["nix", "cli"],
  "url": "https://codeberg.org/v3rm1n/...",
  "mirrorUrl": null,
  "featured": true
}
```

`featured: true` sorts it to the front. `mirrorUrl` is a GitHub URL or `null`.

### Adding your email

The contact section currently lists Codeberg and GitHub only — your address was
deliberately left off rather than published without asking. To add it, append to
the `contact` array:

```json
{"label": "Email", "href": "mailto:you@example.com", "kind": "email"}
```

`kind` is one of `email`, `forge`, `pgp`, `matrix`, `other`, and picks the icon.

### Adding an Impressum

`legal` is `null` by default. If you decide the site needs one, replace it with:

```json
"legal": {"heading": "Impressum", "body": ["Line one", "Line two"]}
```

It renders as a small footer block, and stays absent while `legal` is `null`.

### When the file is malformed

The site shows the exact problem rather than a blank page — for example
`content.json: projects[2].url is not a string`. The message names the field
path, so it tells you what to fix.

## Icons

Two sources, both bundled at build time. Nothing is fetched from either at
runtime.

| Icons | Source | Licence |
| --- | --- | --- |
| Codeberg, GitHub, Matrix | [dashboardicons.com](https://dashboardicons.com) (`homarr-labs/dashboard-icons`) | Apache-2.0 |
| mail, key, external-link | Lucide, via [opensvg.dev](https://opensvg.dev) | ISC |

Brand marks live in `src/icons/` as SVG files and keep their own colours — a
logo that isn't its own colour stops being recognisable. Vite inlines them as
`data:` URIs, so they cost no extra request. The generic marks are inlined as
JSX in `src/components/icons.tsx` and inherit `currentColor`, so they follow the
accent and the light/dark toggle.

To change which icon a contact link gets, see `iconFor()` in
`src/components/icons.tsx`. `kind` selects the family; for `forge` links the
hostname decides between Codeberg and GitHub, and an unrecognised forge falls
back to the generic link mark rather than guessing.

## Privacy properties

These are structural, not claims — check them in a devtools network tab:

- No analytics, no telemetry, no cookies.
- No external fonts. System font stack only.
- No CDN. Every asset is same-origin.
- A loaded page makes zero requests beyond its own origin.
