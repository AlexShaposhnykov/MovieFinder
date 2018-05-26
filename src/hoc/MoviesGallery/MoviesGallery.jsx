import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MovieCard from '../../components/MovieCard/MovieCard';

import { getMovieGenres } from '../../shared/utility';

const MoviesGallery = ({
  loading,
  moviesList,
  moviesGenres,
  gridSpacing,
  gridClassName,
  cardClassName,
}) => {
  let moviesGalleryBody = <CircularProgress color="secondary" style={{ margin: '0 auto 30px auto' }} />;

  if (!loading && moviesList.length !== 0 && moviesGenres.length !== 0) {
    moviesGalleryBody = (
      <Grid container spacing={gridSpacing} className={gridClassName}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={24}>
            {moviesList.map(movieObj => (
              <Grid item key={`${movieObj.id + 1}-${movieObj.title}`}>
                <MovieCard
                  cardClassName={cardClassName}
                  movieObj={movieObj}
                  title={movieObj.title}
                  posterUrl={`http://image.tmdb.org/t/p/w342//${movieObj.poster_path}`}
                  movieId={movieObj.id}
                  genres={getMovieGenres((movieObj.genre_ids || movieObj.genres), moviesGenres)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  // Handle empty response
  if (!loading && moviesList.length === 0) {
    moviesGalleryBody = (
      <Typography align="center" gutterBottom component="h2" variant="subheading">
         Nothing was found
      </Typography>
    );
  }

  return (
    <Fragment>
      { moviesGalleryBody }
    </Fragment>
  );
};

MoviesGallery.propTypes = {
  loading: PropTypes.bool,
  moviesList: PropTypes.arrayOf(PropTypes.object),
  moviesGenres: PropTypes.arrayOf(PropTypes.object),
  gridSpacing: PropTypes.number,
  gridClassName: PropTypes.string,
  cardClassName: PropTypes.string,
};

MoviesGallery.defaultProps = {
  moviesList: PropTypes.arrayOf(PropTypes.any).isRequired,
  moviesGenres: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: false,
  gridClassName: null,
  cardClassName: null,
  gridSpacing: 16,
};

export default MoviesGallery;
