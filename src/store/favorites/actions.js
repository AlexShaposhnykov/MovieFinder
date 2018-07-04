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
// Works Fine
export const addToStorage = (context, movieObj) => context.update('Favorites', {
  favMovies: [...context.Favorites.favMovies, ...movieObj],
});
/*
  console.log('addToStorage obj', movieObj);
  return 

  console.log('addToStorage finished', context.Favorites.favMovies);

  //console.log('add to storage', context.Favorites.favMovies);

  //return syncStorages(context);
;
*/
// FIXME: deleteFromStorage cant filter out any elements
export const deleteFromStorage = (context, movieId) => {
  const curContext = context.Favorites.favMovies;
  console.log('CurContext', curContext);
  const updatedContext = context.Favorites.favMovies.filter(movie => movie.id !== movieId); //.filter(movie => movie.id !== movieId);
  console.log('updatedContext', updatedContext);

  context.update('Favorites', {
    favMovies: [...updatedContext],
  });
};
