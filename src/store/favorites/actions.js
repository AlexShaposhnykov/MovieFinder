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
  const { Favorites } = context;
  const { favMovies } = Favorites;
  console.log('syncStorages arr', favMovies);

  localStorage.setItem('favoriteMovies', JSON.stringify(favMovies));
};

export const addToStorage = (context, movieObj) => {
  context.update('Favorites', {
    favMovies: [...context.Favorites.favMovies, movieObj],
  });

  console.log('addToStorage arr', context.Favorites.favMovies);

  return syncStorages(context);
};

export const deleteFromStorage = (context, movieId) => {
  context.update('Favorites', {
    favMovies: [...context.Favorites.favMovies.filter(movie => movie.id !== movieId)],
  });
  console.log('deleteFromStorage arr', context.Favorites.favMovies);

  return syncStorages(context);
};
