import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  popularMovies: [],
  moviesGenres: [],
  lastPage: null,
  error: false,
};

const initMoviesFetch = state => updateObject(state, {
  loading: true,
  error: false,
});

const setMovies = (state, action) => updateObject(state, {
  popularMovies: [...state.popularMovies, ...action.popularMovies.results],
  moviesGenres: action.moviesGenres.genres,
  lastPage: action.popularMovies.total_pages,
  loading: false,
});

const moviesFetchFail = state => updateObject(state, {
  loading: false,
  error: true,
});

const initMoviesGenresFetch = state => updateObject(state, { error: false });

const HomePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_MOVIES_FETCH: return initMoviesFetch(state, action);
    case actionTypes.INIT_MOVIES_GENRES_FETCH: return initMoviesGenresFetch(state, action);
    case actionTypes.SET_MOVIES: return setMovies(state, action);
    case actionTypes.MOVIES_FETCH_FAIL: return moviesFetchFail(state, action);
    default: return state;
  }
};

export default HomePageReducer;
