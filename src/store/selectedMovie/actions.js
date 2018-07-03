
import { API_KEY, API_URL } from '../../shared/const';
import { fetcher } from '../../shared/utility';

import { initMoviesGenresFetch } from '../newMovies/actions';
/**
|--------------------------------------------------
| Similar movies fetch
|--------------------------------------------------
*/
export const setSimilarMovies = (context, similarMovies) => context.update('SelectedMovie', {
  similarMovies: similarMovies.results,
  loadingSimilar: false,
});

export const similarMoviesFetchFail = context => context.update('SelectedMovie', {
  loadingSimilar: false,
});

export const initSimilarMoviesFetch = (context, movieId) => {
  context.update('SelectedMovie', {
    loadingSimilar: true,
  });

  return fetcher(`${API_URL}/movie/${movieId}/similar${API_KEY}`)
    .then(response => setSimilarMovies(context, response))
    .catch(() => similarMoviesFetchFail(context));
};
/**
|--------------------------------------------------
| Recommended movies fetch
|--------------------------------------------------
*/
export const setRecommendedMovies = (context, recommendedMovies) => context.update('SelectedMovie', {
  recommendedMovies: recommendedMovies.results,
  loadingRecommended: false,
});

export const recommendedMoviesFetchFail = context => context.update('SelectedMovie', {
  loadingRecommended: false,
});

export const initRecommendedMoviesFetch = (context, movieId) => {
  context.update('SelectedMovie', {
    loadingRecommended: true,
  });

  return fetcher(`${API_KEY}/movie/${movieId}/recommendations${API_KEY}`)
    .then(response => setRecommendedMovies(context, response))
    .catch(() => recommendedMoviesFetchFail(context));
};
/**
|--------------------------------------------------
| Selected movie fetch
|--------------------------------------------------
*/
export const setSelectedMovie = (context, selectedMovie) => context.update('SelectedMovie', {
  selectedMovie,
  loading: false,
});

export const selectedMovieFetchFail = (context, error) => context.update('SelectedMovie', {
  error,
  loading: false,
});

export const initSelectedMovieFetch = (context, movieId) => {
  initMoviesGenresFetch(context);

  context.update('SelectedMovie', {
    loading: true,
    error: '',
  });

  initRecommendedMoviesFetch(context, movieId);
  initSimilarMoviesFetch(context, movieId);
  return fetcher(`${API_URL}/movie/${movieId}${API_KEY}`)
    .then(response => setSelectedMovie(context, response))
    .catch(error => selectedMovieFetchFail(context, error));
};
