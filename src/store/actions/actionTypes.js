/**
|--------------------------------------------------
| HomePage action types
|--------------------------------------------------
*/
export const INCREMENT_PAGENUM = 'INCREMENT_PAGENUM';

export const INIT_MOVIES_FETCH = 'INIT_MOVIES_FETCH';
export const SET_MOVIES = 'SET_MOVIES';
export const MOVIES_FETCH_FAIL = 'MOVIES_FETCH_FAIL';

// Reusable actions
export const INIT_MOVIES_GENRES_FETCH = 'INIT_MOVIES_GENRES_FETCH';
export const SET_MOVIES_GENRES = 'SET_MOVIES_GENRES';
/**
|--------------------------------------------------
| MoviePage action types
|--------------------------------------------------
*/
export const INIT_SELECTED_MOVIE_FETCH = 'INIT_SELECTED_MOVIE_FETCH';
export const SET_SELECTED_MOVIE = 'SET_SELECTED_MOVIE';
export const SELECTED_MOVIE_FETCH_FAIL = 'SELECTED_MOVIE_FETCH_FAIL';

export const INIT_RECOMMENDED_MOVIES_FETCH = 'INIT_RECOMMENDED_MOVIES_FETCH';
export const SET_RECOMMENDED_MOVIES = 'SET_RECOMMENDED_MOVIES';
export const RECOMMENDED_MOVIES_FETCH_FAIL = 'RECOMMENDED_MOVIES_FETCH_FAIL';

export const INIT_SIMILAR_MOVIES_FETCH = 'INIT_SIMILAR_MOVIES_FETCH';
export const SET_SIMILAR_MOVIES = 'SET_SIMILAR_MOVIES';
export const SIMILAR_MOVIES_FETCH_FAIL = 'SIMILAR_MOVIES_FETCH_FAIL';
/**
|--------------------------------------------------
| Favorites action types
|--------------------------------------------------
*/
export const ADD_TO_STORAGE = 'ADD_TO_STORAGE';
export const DELETE_FROM_STORAGE = 'DELETE_FROM_STORAGE';
export const SYNC_STORAGE = 'SYNC_STORAGE';
