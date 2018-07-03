
import { API_KEY, API_URL } from '../../shared/const';
import { fetcher } from '../../shared/utility';

import { initMoviesGenresFetch } from '../newMovies/actions';

export const setSearchResults = (context, searchResults) => context.update('Search', {
  searchResults: searchResults.results,
  loadingSearchResults: false,
});

export const requestSearchResults = (context, inputValue) => {
  initMoviesGenresFetch(context);

  context.update('Search', {
    loadingSearchResults: true,
  });

  return fetcher(`${API_URL}/search/movie${API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=false`)
    .then(response => setSearchResults(context, response))
    .catch(error => error);
};
