/* eslint-disable no-undef */
import React from 'react';
import { } from 'styled-components'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const node = document.createElement('div')
node.id = 'purify-reader'
document.body.parentElement.appendChild(node)

ReactDOM.render(<App />, node)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
