/* eslint-disable */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const app = (
  <Fragment>
    <App />
  </Fragment>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
