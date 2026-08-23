import React from 'react';
import ReactDOM from 'react-dom';
import './css/Index.css';
import App from './App';
import { initLongPressTooltips } from './data/longPressTooltipManager';

initLongPressTooltips();

ReactDOM.render(<App />, document.getElementById('root'));
