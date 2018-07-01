
import { API_KEY, API_URL } from '../../shared/const';
import { fetcher } from '../../shared/utility';

export const setMovies = (context, movies) => context.update('NewMovies', {
  popularMovies: [...context.NewMovies.popularMovies, ...movies.results],
  lastPage: movies.total_pages,
  loading: false,
  curPage: context.NewMovies.curPage + 1,
});

export const setMoviesGenres = (context, genresObj) => context.update('NewMovies', {
  moviesGenres: genresObj.genres,
  loadingGenres: false,
});

export const moviesFetchFail = context => context.update('NewMovies', {
  loading: false,
  error: true,
});

export const initMoviesGenresFetch = (context) => {
  // Check if moviesGenres has already been fetched
  const currGenresState = context.NewMovies.moviesGenres;
  if (currGenresState.length) {
    return Promise.resolve();
  }

  context.update('NewMovies', { loadingGenres: true });

  return fetcher(`${API_URL}/genre/movie/list${API_KEY}`)
    .then(response => setMoviesGenres(context, response))
    .catch(err => moviesFetchFail(context, err));
};

export const initMoviesFetch = (context) => {
  initMoviesGenresFetch(context);

  context.update('NewMovies', {
    loading: true,
    error: false,
  });

  return fetcher(`${API_URL}/movie/popular${API_KEY}&language=en-US&page=${context.NewMovies.curPage}`)
    .then(response => setMovies(context, response))
    .catch(() => moviesFetchFail(context));
};
