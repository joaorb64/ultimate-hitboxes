import React from 'react';
import ReactDOM from 'react-dom';
import './css/Index.css';
import App from './App';

// Single Page Apps for GitHub Pages: https://github.com/rafgraph/spa-github-pages
// Undoes the redirect 404.html made for a deep link (e.g. /character/move), restoring the
// real URL via history.replaceState before React Router ever looks at window.location.
// This has to live here rather than in a plain <script> in index.html: bundle.js itself is
// loaded via a *relative* <script src>, and calling replaceState before that tag is parsed
// changes the document's base URL out from under it, breaking that very request. Doing it
// here guarantees bundle.js (this code) already loaded successfully first.
(function (l) {
  if (l.search[1] === "/") {
    var decoded = l.search.slice(1).split("&").map(function (s) {
      return s.replace(/~and~/g, "&");
    }).join("?");
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
})(window.location);

ReactDOM.render(<App />, document.getElementById('root'));
