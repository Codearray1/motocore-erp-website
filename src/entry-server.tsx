import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';
import {headHtml} from './seo/head';
import {ROUTES, type RouteDef} from './seo/routes';

/** Build-time rendering for scripts/prerender.mjs: the page body and its <head> tags. */
export function render(route: RouteDef): {html: string; head: string} {
  return {
    html: renderToString(
      <StrictMode>
        <App route={route} />
      </StrictMode>,
    ),
    head: headHtml(route),
  };
}

export {ROUTES};
