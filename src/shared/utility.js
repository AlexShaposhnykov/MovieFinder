export const updateObject = (oldObj, newProperties) => ({
  ...oldObj,
  ...newProperties,
});

export const getMovieGenres = (movieGenres, genresList) => {
  const genres = [];
  for (let i = 0; i < movieGenres.length; i += 1) {
    for (let j = 0; j < genresList.length; j += 1) {
      if (genresList[j].id === movieGenres[i]) {
        genres.push(genresList[j].name);
      }
    }
  }
  return genres;
};

export const isInFavorites = (favList, movieId) => (
  favList.findIndex(favMovie => favMovie.id === movieId)
);

