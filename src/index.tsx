import { h, render } from 'preact';
import App from './App.js';
import GlobalStoreProvider from './store/store';
import 'preact/devtools';
import './global.css';

const root = document.getElementById('root');

if (root) {
  render(
    <GlobalStoreProvider>
      <App />
    </GlobalStoreProvider>,
    root,
  );
}
