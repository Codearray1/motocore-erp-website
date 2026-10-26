import './patch-fetch.ts';
import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import {findRoute} from './seo/routes';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App route={findRoute(window.location.pathname)} />
  </StrictMode>
);
// Built pages arrive pre-rendered (scripts/prerender.mjs): attach to that HTML. The dev server serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
