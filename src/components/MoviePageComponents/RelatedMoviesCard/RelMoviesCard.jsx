import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';

import { getMovieGenres } from '../../../shared/utility';

import MovieCard from '../../../components/MovieCard/MovieCard';

const styles = {
  customPaper: {
    margin: '50px auto',
    padding: '40px 10px',
    maxWidth: 1300,
    backgroundColor: 'white',
    borderRadius: '18px',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  paperTitle: {
    marginBottom: '20px',
  },
  gridStyling: {
    width: '100%',
    margin: 0,
    minHeight: 600,
  },
};

const RelMoviesCard = ({
  classes,
  loading,
  moviesList,
  moviesGenres,
  relatedType,
}) => {
  let relMoviesBody = <CircularProgress color="secondary" />;

  if (!loading && moviesList.length !== 0) {
    relMoviesBody = (
      <Grid container spacing={16} className={classes.gridStyling}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={24}>
            {moviesList.map(movieObj => (
              <Grid item key={`${movieObj.id + 1}-${movieObj.title}`}>
                <MovieCard
                  title={movieObj.title}
                  posterUrl={`http://image.tmdb.org/t/p/w342//${movieObj.poster_path}`}
                  movieId={movieObj.id}
                  genres={getMovieGenres(movieObj.genre_ids, moviesGenres)}
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
    relMoviesBody = (
      <Typography align="center" gutterBottom component="h2" variant="subheading">
         Nothing was found
      </Typography>
    );
  }

  return (
    <Grow
      in
      timeout={{
        enter: 360,
      }}
      mountOnEnter
    >
      <div className={classes.customPaper}>
        <Typography align="center" gutterBottom component="h1" variant="headline" className={classes.paperTitle}>
          { relatedType === 'similarMovies'
            ? 'Similar Movies:'
            : 'Recommended Movies:'
          }
        </Typography>
        { relMoviesBody }
      </div>
    </Grow>
  );
};

RelMoviesCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  relatedType: PropTypes.string,
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  moviesGenres: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

RelMoviesCard.defaultProps = {
  relatedType: 'recommendedMovies',
};

export default withStyles(styles)(RelMoviesCard);
