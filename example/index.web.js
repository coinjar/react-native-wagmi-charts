import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';

const container = document.getElementById('root');
createRoot(container).render(createElement(App));
