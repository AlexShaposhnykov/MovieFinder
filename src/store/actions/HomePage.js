import * as actionTypes from './actionTypes';

import { API_KEY, API_URL } from '../../shared/const';
import { fetcher } from '../../shared/utility';

export const setMovies = movies => ({
  type: actionTypes.SET_MOVIES,
  popularMovies: movies,
  lastPage: movies,
});

export const setMoviesGenres = genres => ({
  type: actionTypes.SET_MOVIES_GENRES,
  moviesGenres: genres,
});

export const moviesFetchFail = () => ({
  type: actionTypes.MOVIES_FETCH_FAIL,
});

export const initMoviesGenresFetch = () => (dispatch, getState) => {
  // Check if moviesGenres has already been fetched
  const currGenresState = getState().Home.moviesGenres;
  if (currGenresState.length) {
    return Promise.resolve();
  }

  dispatch({ type: actionTypes.INIT_MOVIES_GENRES_FETCH });

  return fetcher(`${API_URL}/genre/movie/list${API_KEY}`)
    .then(response => dispatch(setMoviesGenres(response)))
    .catch(err => dispatch(moviesFetchFail(err)));
};

export const initMoviesFetch = curPage => (dispatch) => {
  dispatch(initMoviesGenresFetch());
  dispatch({ type: actionTypes.INIT_MOVIES_FETCH });
  dispatch({ type: actionTypes.INCREMENT_PAGENUM });

  return fetcher(`${API_URL}/movie/popular${API_KEY}&language=en-US&page=${curPage}`)
    .then(response => dispatch(setMovies(response)))
    .catch(() => dispatch(moviesFetchFail()));
};
