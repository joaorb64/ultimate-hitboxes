import React from 'react';
import ReactDOM from 'react-dom';
import './css/Index.css';
import App from './App';
import { initTapTooltips } from './data/tapTooltipManager';

initTapTooltips();

ReactDOM.render(<App />, document.getElementById('root'));
