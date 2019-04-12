import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './Styles/common.scss';
import './Lib/materialize/materialize.min.css';
import './Lib/materialize/materialize.min.js';
import { HashRouter, Route, Switch, hashHistory, BrowserRouter } from 'react-router-dom';

render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
)
