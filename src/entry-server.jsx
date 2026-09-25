import { renderToString } from 'preact-render-to-string';
import App from './App.jsx';

/** Used at build time to pre-render the page into dist/index.html */
export function render() {
  return renderToString(<App />);
}
