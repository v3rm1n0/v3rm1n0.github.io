import {useEffect, useState} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {useContent} from './content/useContent';
import {loadMode, saveMode, portfolioTheme, type Mode} from './theme';
import {Nav} from './components/Nav';
import {Hero} from './components/Hero';
import {About} from './components/About';
import {Skills} from './components/Skills';
import {Projects} from './components/Projects';
import {Contributions} from './components/Contributions';
import {Contact} from './components/Contact';
import {Footer} from './components/Footer';
import {LoadError} from './components/LoadError';
import {ErrorBoundary} from './components/ErrorBoundary';

/** All skill items, flattened across groups, capped at 6 for the hero chip row. */
function heroChips(groups: {items: string[]}[]): string[] {
  return groups.flatMap((group) => group.items).slice(0, 6);
}

export function App() {
  const [mode, setMode] = useState<Mode>(loadMode);
  const state = useContent();

  function changeMode(next: Mode) {
    setMode(next);
    saveMode(next);
  }

  const name = state.status === 'ready' ? state.content.meta.name : 'Niklas';

  useEffect(() => {
    if (state.status !== 'ready') return;
    document.title = state.content.meta.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', state.content.meta.metaDescription);
    }
  }, [state]);

  return (
    <Theme theme={portfolioTheme} mode={mode}>
      <ErrorBoundary>
        <Nav name={name} mode={mode} onModeChange={changeMode} />
        <main id="main">
          {state.status === 'loading' && <p aria-live="polite">Loading…</p>}
          {state.status === 'error' && <LoadError message={state.message} />}
          {state.status === 'ready' && (
            <>
              <Hero meta={state.content.meta} chips={heroChips(state.content.skills)} />
              <About about={state.content.about} />
              <Skills groups={state.content.skills} />
              <Projects projects={state.content.projects} />
              <Contributions contributions={state.content.contributions} />
              <Contact links={state.content.contact} />
            </>
          )}
        </main>
        <Footer
          name={name}
          legal={state.status === 'ready' ? state.content.legal : null}
        />
      </ErrorBoundary>
    </Theme>
  );
}
