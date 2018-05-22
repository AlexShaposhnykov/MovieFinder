import * as actionTypes from './actionTypes';
import axiosInstance from '../../axiosInstance';

export const setMovies = (movies, genres) => ({
  type: actionTypes.SET_MOVIES,
  popularMovies: movies,
  moviesGenres: genres,
  lastPage: movies,
});

export const moviesFetchFail = () => ({
  type: actionTypes.MOVIES_FETCH_FAIL,
});

export const initMoviesGenresFetch = movies => (dispatch) => {
  dispatch({ type: actionTypes.INIT_MOVIES_GENRES_FETCH });
  return axiosInstance.get('/genre/movie/list?api_key=c762c9c5fa78eb649803d76c5ed47090')
    .then(response => dispatch(setMovies(movies, response.data)))
    .catch(() => dispatch(moviesFetchFail()));
};

export const initMoviesFetch = (curPage = 1) => (dispatch) => {
  dispatch({ type: actionTypes.INIT_MOVIES_FETCH });
  return axiosInstance.get(`/movie/popular?api_key=c762c9c5fa78eb649803d76c5ed47090&language=en-US&page=${curPage}`)
    .then(response => dispatch(initMoviesGenresFetch(response.data)))
    .catch(() => dispatch(moviesFetchFail()));
};
