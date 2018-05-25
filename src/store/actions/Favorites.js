import * as actionTypes from './actionTypes';

export const addToStorage = movieObj => ({
  type: actionTypes.ADD_TO_STORAGE,
  movie: movieObj,
});

export const deleteFromStorage = movieId => ({
  type: actionTypes.DELETE_FROM_STORAGE,
  movieId,
});
