/* eslint-disable */
import React, { Component, createContext } from 'react';

export const Context = createContext();

class WithGlobalContext extends Component {
  state = {
    SelectedMovie: {
      loading: false,
      loadingRecommended: false,
      loadingSimilar: false,
      selectedMovie: [],
      recommendedMovies: [],
      similarMovies: [],
      error: false,
    },
    NewMovies: {
      loading: false,
      loadingGenres: false,
      popularMovies: [],
      moviesGenres: [],
      lastPage: null,
      curPage: 1,
      error: false,
    },
    Search: {
      searchResults: [],
      loadingSearchResults: false,
    },
    Favorites: {
      favMovies: [],
    },
    dispatch: (action, ...funcParams) => action(this.state, funcParams),
    update: (contextPath, pendingsContextUpdate) => {
      this.setState(state => ({
        ...state,
        [contextPath]: {
          ...state[contextPath],
          ...pendingsContextUpdate,
        },
      }));
    },
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default WithGlobalContext;
