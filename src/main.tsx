import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import './styles.css';
import {App} from './App';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found in index.html');

if (root.hasChildNodes()) {
  hydrateRoot(
    root,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
