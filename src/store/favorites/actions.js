export const initLocalStorage = (context) => {
  if (localStorage.getItem('favoriteMovies') === null) {
    localStorage.setItem('favoriteMovies', JSON.stringify([]));
  }
  const storedData = JSON.parse(localStorage.getItem('favoriteMovies'));

  context.update('Favorites', {
    favMovies: storedData,
  });
};

export const syncStorages = (context) => {
  localStorage.setItem('favoriteMovies', JSON.stringify(context.Favorites.favMovies));
  console.log('syncStorages arr', context.Favorites.favMovies);
};

export const addToStorage = (context, movieObj) => (
  context.update('Favorites', {
    favMovies: [movieObj, ...context.Favorites.favMovies],
  }, () => syncStorages(context))
);

export const deleteFromStorage = (context, movieId) => (
  context.update('Favorites', {
    favMovies: context.Favorites.favMovies.filter(movie => movie.id !== movieId),
  }, () => syncStorages(context))
);
