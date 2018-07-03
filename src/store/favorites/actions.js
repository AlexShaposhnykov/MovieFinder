
export const syncStorages = (context) => {
  const { Favorites } = context;
  const { favMovies } = Favorites;


};

export const addToStorage = (context, movieObj) => {

  context.update('Favorites', {
    [movieObj.id]: movieObj,
  });

};

export const deleteFromStorage = (context, movieId) => {

  context.update('Favorites', {
    favMovies: context.Favorites.favMovies.filter(movie => movie.id !== movieId),
  });
  
};

