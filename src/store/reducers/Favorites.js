import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  favMovies: [],
};

const FavoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_STORAGE:
      return updateObject(state, {
        type: actionTypes.DELETE_FROM_STORAGE,
        favMovies: state.favMovies.filter(movie => movie.id !== action.movieId),
      });
    case actionTypes.DELETE_FROM_STORAGE:
      return updateObject(state, {
        type: actionTypes.DELETE_FROM_STORAGE,
        favMovies: state.favMovies.filter(movie => movie.id !== action.movieId),
      });
    default: return state;
  }
};

export default FavoritesReducer;
