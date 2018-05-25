import * as actionTypes from './actionTypes';
import axiosInstance from '../../axiosInstance';

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

export const initMoviesGenresFetch = () => (dispatch) => {
  dispatch({ type: actionTypes.INIT_MOVIES_GENRES_FETCH });
  return axiosInstance.get('/genre/movie/list?api_key=c762c9c5fa78eb649803d76c5ed47090')
    .then(response => dispatch(setMoviesGenres(response.data)))
    .catch(() => dispatch(moviesFetchFail()));
};

export const initMoviesFetch = curPage => (dispatch) => {
  dispatch(initMoviesGenresFetch());
  dispatch({ type: actionTypes.INIT_MOVIES_FETCH });
  dispatch({ type: actionTypes.INCREMENT_PAGENUM });
  return axiosInstance.get(`/movie/popular?api_key=c762c9c5fa78eb649803d76c5ed47090&language=en-US&page=${curPage}`)
    .then(response => dispatch(setMovies(response.data)))
    .catch(() => dispatch(moviesFetchFail()));
};
