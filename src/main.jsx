import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
// The HTML is pre-rendered at build time; hydrate it instead of re-rendering.
if (root.firstElementChild) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
