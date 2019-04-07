import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './Styles/common.scss';
import './Lib/materialize/materialize.min.css';
import './Lib/materialize/materialize.min.js';

render(
    <App />,
    document.getElementById('root')
)
