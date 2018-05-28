import * as actionTypes from './actionTypes';
import axiosInstance from '../../axiosInstance';

import { API_KEY } from '../../shared/const';

import * as actions from '../actions/actionsExporter';

export const setSearchResults = searchResults => ({
  type: actionTypes.SET_SEARCH_RESULTS,
  searchResults,
});

export const requestSearchResults = inputValue => (dispatch) => {
  dispatch(actions.initMoviesGenresFetch());
  dispatch({ type: actionTypes.REQUEST_SEARCH_RESULTS });
  return axiosInstance.get(`/search/movie${API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=false`)
    .then(response => dispatch(setSearchResults(response.data)))
    .catch(error => error);
};
