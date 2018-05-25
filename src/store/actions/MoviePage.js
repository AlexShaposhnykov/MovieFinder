import * as actionTypes from './actionTypes';
import axiosInstance from '../../axiosInstance';

import * as actions from '../actions/actionsExporter';

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
  return axiosInstance.get(`/movie/${movieId}/similar?api_key=c762c9c5fa78eb649803d76c5ed47090`)
    .then(response => dispatch(setSimilarMovies(response.data)))
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
  return axiosInstance.get(`/movie/${movieId}/recommendations?api_key=c762c9c5fa78eb649803d76c5ed47090`)
    .then(response => dispatch(setRecommendedMovies(response.data)))
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
  return axiosInstance.get(`/movie/${movieId}?api_key=c762c9c5fa78eb649803d76c5ed47090`)
    .then(response => dispatch(setSelectedMovie(response.data)))
    .catch(error => dispatch(selectedMovieFetchFail(error)));
};
