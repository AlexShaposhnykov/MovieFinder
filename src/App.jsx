/* eslint-disable*/
import React, { Component } from 'react';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import CircularProgress from '@material-ui/core/CircularProgress';

import { persistStore, autoRehydrate } from 'redux-persist';
import { asyncLocalStorage } from 'redux-persist/storages';

import MoviePageReducer from './store/reducers/MoviePage';
import FavoritesReducer from './store/reducers/Favorites';
import SearchReducer from './store/reducers/Search';

import Root from './root';

const rootReducer = combineReducers({
  MoviePage: MoviePageReducer,
  Favorites: FavoritesReducer,
  Search: SearchReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    autoRehydrate(),
  ),
);

class App extends Component {
  state = {
    isReady: false,
  }

  // Redux-persist setup
  componentDidMount = () => {
    persistStore(
      store, 
      {
        storage: asyncLocalStorage,
        whitelist: ['Favorites'],
      },
      () => {
        this.setState({ isReady: true })
      }
    );
  }

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return <CircularProgress
        style={{
          position: 'absolute',
          top: '50%',
          left: '48%',
          color: '#212121',
          animationDuration: '.6s',
        }}
      />
    }

    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
