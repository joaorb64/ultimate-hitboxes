import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/Index.css';
import App from './App';

// Single Page Apps for GitHub Pages: https://github.com/rafgraph/spa-github-pages
// Undoes the redirect 404.html made for a deep link (e.g. /character/move), restoring the
// real URL via history.replaceState before React Router ever looks at window.location.
(function (l) {
  if (l.search[1] === "/") {
    var decoded = l.search.slice(1).split("&").map(function (s) {
      return s.replace(/~and~/g, "&");
    }).join("?");
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
})(window.location);

createRoot(document.getElementById('root')).render(<App />);
