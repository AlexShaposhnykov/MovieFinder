import 'whatwg-fetch';

export const updateObject = (oldObj, newProperties) => ({
  ...oldObj,
  ...newProperties,
});

export const getMovieGenres = (currMovieGenres, allGenres) =>
  currMovieGenres.reduce((genresArr, movieGenre) =>
    [...genresArr, allGenres.find(genre => genre.id === (movieGenre.id || movieGenre)).name], []);

export const isInFavorites = (favList, movieId) => (
  favList.findIndex(favMovie => favMovie.id === movieId)
);

export const fetcher = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  return data;
};

