import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  favMovies: [],
};

const addToStorage = (state, action) => updateObject(state, {
  type: actionTypes.ADD_TO_STORAGE,
  favMovies: [...state.favMovies, action.movie],
});

const deleteFromStorage = (state, action) => updateObject(state, {
  type: actionTypes.DELETE_FROM_STORAGE,
  favMovies: state.favMovies.filter(movie => movie.id !== action.movieId),
});

const FavoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_STORAGE: return addToStorage(state, action);
    case actionTypes.DELETE_FROM_STORAGE: return deleteFromStorage(state, action);
    default: return state;
  }
};

export default FavoritesReducer;
