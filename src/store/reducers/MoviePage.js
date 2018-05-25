import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  loadingRecommended: false,
  loadingSimilar: false,
  selectedMovie: [],
  recommendedMovies: [],
  similarMovies: [],
  error: false,
};

/**
|--------------------------------------------------
| Selected movie section
|--------------------------------------------------
*/
const initSelectedMovieFetch = state => updateObject(state, {
  type: actionTypes.INIT_SELECTED_MOVIE_FETCH,
  loading: true,
  error: '',
});

const setSelectedMovie = (state, action) => updateObject(state, {
  type: actionTypes.SET_SELECTED_MOVIE,
  selectedMovie: action.selectedMovie,
  loading: false,
});

const selectedMovieFetchFail = (state, action) => updateObject(state, {
  type: actionTypes.SELECTED_MOVIE_FETCH_FAIL,
  error: action.error,
  loading: false,
});
/**
|--------------------------------------------------
| Similar movies section
|--------------------------------------------------
*/
const initSimilarMoviesFetch = state => updateObject(state, {
  type: actionTypes.INIT_SIMILAR_MOVIES_FETCH,
  loadingSimilar: true,
});

const setSimilarMovies = (state, action) => updateObject(state, {
  type: actionTypes.SET_SIMILAR_MOVIES,
  similarMovies: action.similarMovies.results,
  loadingSimilar: false,
});

const similarMoviesFetchFail = state => updateObject(state, {
  type: actionTypes.SIMILAR_MOVIES_FETCH_FAIL,
  loadingSimilar: false,
});
/**
|--------------------------------------------------
| Recommended movies section
|--------------------------------------------------
*/
const initRecommendedMoviesFetch = state => updateObject(state, {
  type: actionTypes.INIT_RECOMMENDED_MOVIES_FETCH,
  loadingRecommended: true,
});

const setRecommendedMovies = (state, action) => updateObject(state, {
  type: actionTypes.SET_RECOMMENDED_MOVIES,
  recommendedMovies: action.recommendedMovies.results,
  loadingRecommended: false,
});

const recommendedMoviesFetchFail = state => updateObject(state, {
  type: actionTypes.RECOMMENDED_MOVIES_FETCH_FAIL,
  loadingRecommended: false,
});

const MoviePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_SELECTED_MOVIE_FETCH: return initSelectedMovieFetch(state, action);
    case actionTypes.SET_SELECTED_MOVIE: return setSelectedMovie(state, action);
    case actionTypes.SELECTED_MOVIE_FETCH_FAIL: return selectedMovieFetchFail(state, action);
    case actionTypes.INIT_SIMILAR_MOVIES_FETCH: return initSimilarMoviesFetch(state, action);
    case actionTypes.SET_SIMILAR_MOVIES: return setSimilarMovies(state, action);
    case actionTypes.SIMILAR_MOVIES_FETCH_FAIL: return similarMoviesFetchFail(state, action);
    case actionTypes.INIT_RECOMMENDED_MOVIES_FETCH: return initRecommendedMoviesFetch(state, action);
    case actionTypes.SET_RECOMMENDED_MOVIES: return setRecommendedMovies(state, action);
    case actionTypes.RECOMMENDED_MOVIES_FETCH_FAIL: return recommendedMoviesFetchFail(state, action);
    default: return state;
  }
};

export default MoviePageReducer;
