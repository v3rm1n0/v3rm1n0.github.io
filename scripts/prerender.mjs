import fs from 'node:fs/promises';
import {createServer} from 'vite';
import React from 'react';
import {renderToString} from 'react-dom/server';

async function prerender() {
  const contentPath = new URL('../public/content.json', import.meta.url);
  const distIndexPath = new URL('../dist/index.html', import.meta.url);

  const rawJson = await fs.readFile(contentPath, 'utf-8');
  const content = JSON.parse(rawJson);

  const server = await createServer({
    mode: 'production',
    server: {middlewareMode: true},
    appType: 'custom',
  });

  let appHtml = '';
  let parsedContent;

  try {
    const {App} = await server.ssrLoadModule('/src/App.tsx');
    const {parseContent} = await server.ssrLoadModule('/src/content/schema.ts');

    parsedContent = parseContent(content);
    appHtml = renderToString(React.createElement(App, {initialContent: parsedContent}));
  } finally {
    await server.close();
  }

  let html = await fs.readFile(distIndexPath, 'utf-8');

  const safeJson = JSON.stringify(content).replace(/</g, '\\u003c');
  const rootReplacement = `<div id="root">${appHtml}</div>\n    <script id="content-data" type="application/json">${safeJson}</script>`;
  html = html.replace('<div id="root"></div>', rootReplacement);

  // Sync title and meta description for SEO and no-JS visitors
  if (parsedContent?.meta?.pageTitle) {
    html = html.replace(/<title>.*?<\/title>/, `<title>${parsedContent.meta.pageTitle}</title>`);
  }
  if (parsedContent?.meta?.metaDescription) {
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
      `<meta name="description" content="${parsedContent.meta.metaDescription}" />`,
    );
  }

  await fs.writeFile(distIndexPath, html, 'utf-8');
  console.log('✓ Prerendered static site into dist/index.html');
}

prerender().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
