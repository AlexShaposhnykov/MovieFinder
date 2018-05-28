import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  loadingGenres: false,
  popularMovies: [],
  moviesGenres: [],
  lastPage: null,
  curPage: 1,
  error: false,
};

const incrementPageNum = state => updateObject(state, {
  curPage: state.curPage + 1,
});
/**
|--------------------------------------------------
| Movies actions
|--------------------------------------------------
*/
const initMoviesFetch = state => updateObject(state, {
  loading: true,
  error: false,
});

const setMovies = (state, action) => updateObject(state, {
  popularMovies: [...state.popularMovies, ...action.popularMovies.results],
  lastPage: action.popularMovies.total_pages,
  loading: false,
});

const moviesFetchFail = state => updateObject(state, {
  loading: false,
  error: true,
});
/**
|--------------------------------------------------
| Movies genres actions
|--------------------------------------------------
*/
const initMoviesGenresFetch = state => updateObject(state, {
  loadingGenres: true,
});

const setMoviesGenres = (state, action) => updateObject(state, {
  moviesGenres: action.moviesGenres.genres,
  loadingGenres: false,
});

const HomePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT_PAGENUM: return incrementPageNum(state, action);
    case actionTypes.INIT_MOVIES_FETCH: return initMoviesFetch(state, action);
    case actionTypes.SET_MOVIES: return setMovies(state, action);
    case actionTypes.MOVIES_FETCH_FAIL: return moviesFetchFail(state, action);
    case actionTypes.INIT_MOVIES_GENRES_FETCH: return initMoviesGenresFetch(state, action);
    case actionTypes.SET_MOVIES_GENRES: return setMoviesGenres(state, action);
    default: return state;
  }
};

export default HomePageReducer;
