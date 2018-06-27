import * as actionTypes from './actionTypes';

import { API_KEY, API_URL } from '../../shared/const';

import * as actions from '../actions/actionsExporter';

import { fetcher } from '../../shared/utility';

export const setSearchResults = searchResults => ({
  type: actionTypes.SET_SEARCH_RESULTS,
  searchResults,
});

export const requestSearchResults = inputValue => (dispatch) => {
  dispatch(actions.initMoviesGenresFetch());
  dispatch({ type: actionTypes.REQUEST_SEARCH_RESULTS });
  return fetcher(`${API_URL}/search/movie${API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=false`)
    .then(response => dispatch(setSearchResults(response)))
    .catch(error => error);
};
