import * as actionTypes from './actionTypes';

import { API_KEY, API_URL } from '../../shared/const';

import * as actions from '../actions/actionsExporter';

import { fetcher } from '../../shared/utility';

/**
|--------------------------------------------------
| Similar movies fetch
|--------------------------------------------------
*/
export const setSimilarMovies = simMovies => ({
  type: actionTypes.SET_SIMILAR_MOVIES,
  similarMovies: simMovies,
});

export const similarMoviesFetchFail = () => ({
  type: actionTypes.SIMILAR_MOVIES_FETCH_FAIL,
});

export const initSimilarMoviesFetch = movieId => (dispatch) => {
  dispatch({ type: actionTypes.INIT_SIMILAR_MOVIES_FETCH });
  return fetcher(`${API_URL}/movie/${movieId}/similar${API_KEY}`)
    .then(response => dispatch(setSimilarMovies(response)))
    .catch(() => dispatch(similarMoviesFetchFail()));
};
/**
|--------------------------------------------------
| Recommended movies fetch
|--------------------------------------------------
*/
export const setRecommendedMovies = recMovies => ({
  type: actionTypes.SET_RECOMMENDED_MOVIES,
  recommendedMovies: recMovies,
});

export const recommendedMoviesFetchFail = () => ({
  type: actionTypes.RECOMMENDED_MOVIES_FETCH_FAIL,
});

export const initRecommendedMoviesFetch = movieId => (dispatch) => {
  dispatch({ type: actionTypes.INIT_RECOMMENDED_MOVIES_FETCH });
  return fetcher(`${API_KEY}/movie/${movieId}/recommendations${API_KEY}`)
    .then(response => dispatch(setRecommendedMovies(response)))
    .catch(() => dispatch(recommendedMoviesFetchFail()));
};
/**
|--------------------------------------------------
| Selected movie fetch
|--------------------------------------------------
*/
export const setSelectedMovie = movie => ({
  type: actionTypes.SET_SELECTED_MOVIE,
  selectedMovie: movie,
});

export const selectedMovieFetchFail = error => ({
  type: actionTypes.SELECTED_MOVIE_FETCH_FAIL,
  error,
});

export const initSelectedMovieFetch = movieId => (dispatch) => {
  dispatch(actions.initMoviesGenresFetch());
  dispatch({ type: actionTypes.INIT_SELECTED_MOVIE_FETCH });
  dispatch(initRecommendedMoviesFetch(movieId));
  dispatch(initSimilarMoviesFetch(movieId));
  return fetcher(`${API_URL}/movie/${movieId}${API_KEY}`)
    .then(response => dispatch(setSelectedMovie(response)))
    .catch(error => dispatch(selectedMovieFetchFail(error)));
};
