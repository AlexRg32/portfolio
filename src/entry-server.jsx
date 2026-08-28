import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/** Renders one route to static HTML for the prerender step. */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
