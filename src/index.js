/* eslint-disable */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';

import App from './App';

import HomePageReducer from './store/reducers/HomePage';

import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  Home: HomePageReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ),
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
