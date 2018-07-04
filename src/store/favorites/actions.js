export const initLocalStorage = (context) => {
  const storedData = JSON.parse(localStorage.getItem('favoriteMovies'));

  context.update('Favorites', {
    favMovies: storedData || [],
  });
};

export const syncStorages = (context) => {
  const { Favorites } = context;
  const { favMovies } = Favorites;

  //console.log('sync', favMovies);
  localStorage.setItem('favoriteMovies', JSON.stringify(favMovies));
};

export const addToStorage = (context, movieObj) => {
  console.log('addToStorage obj', movieObj);
  context.update('Favorites', {
    favMovies: [...context.Favorites.favMovies, ...movieObj],
  });

  console.log('addToStorage action', context.Favorites.favMovies);

  //console.log('add to storage', context.Favorites.favMovies);

  //return syncStorages(context);
};

export const deleteFromStorage = (context, movieId) => {
  console.log('MovieIDinACtion', movieId);
  console.log('FavMovies in deleteFromStorage', context.Favorites.favMovies);
  return context.update('Favorites', {
    favMovies: [...context.Favorites.favMovies.filter(movie => movie.id !== movieId)],
  });

  // console.log('remove from storage', context.Favorites.favMovies);

  // return syncStorages(context);
};

