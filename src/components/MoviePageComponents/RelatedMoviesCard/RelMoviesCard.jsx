import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

import MoviesGallery from '../../../hoc/MoviesGallery/MoviesGallery';

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
}) => (
  <Grow
    in
    timeout={{
      enter: 360,
    }}
    mountOnEnter
  >
    <div className={classes.customPaper}>
      <Typography
        align="center"
        gutterBottom
        component="h1"
        variant="headline"
        className={classes.paperTitle}
      >
        { relatedType === 'similarMovies'
          ? 'Similar Movies:'
          : 'Recommended Movies:'
        }
      </Typography>
      <MoviesGallery
        loading={loading}
        moviesList={moviesList}
        moviesGenres={moviesGenres}
        gridClassName={classes.gridStyling}
      />
    </div>
  </Grow>
);

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
