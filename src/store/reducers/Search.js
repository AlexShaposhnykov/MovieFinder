import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  searchResults: [],
  loadingSearchResults: false,
};

const requestSearchResult = state => updateObject(state, {
  type: actionTypes.REQUEST_SEARCH_RESULTS,
  loadingSearchResults: true,
});

const setSearchResults = (state, action) => updateObject(state, {
  type: actionTypes.SET_SEARCH_RESULTS,
  searchResults: action.searchResults.results,
  loadingSearchResults: false,
});

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_SEARCH_RESULTS: return requestSearchResult(state, action);
    case actionTypes.SET_SEARCH_RESULTS: return setSearchResults(state, action);
    default: return state;
  }
};

export default SearchReducer;
