/* eslint react/prop-types: 0 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import StarBorder from '@material-ui/icons/StarBorder';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  infoWrapper: {
    maxWidth: 1300,
    margin: '50px auto',
    padding: 10,
  },
  favouritesBtn: {
    position: 'absolute',
    zIndex: '20',
    color: `#${theme.palette.secondary.dark}`,
    right: 5,
    top: 5,
    backgroundColor: `${theme.palette.primary.main}`,
  },
  moviePoster: {
    position: 'relative',
    backgroundColor: '#eee',
    margin: 0,
    height: '100%',
  },
  movieTitle: {
    color: theme.palette.secondary.contrastText,
  },
  movieTagline: {
    borderLeft: '2px solid #eee',
    paddingLeft: 10,
    fontStyle: 'italic',
    color: 'rgba(64, 64, 64, 0.87)',
  },
  movieDesc: {
    padding: 30,
    border: `1px solid #${theme.palette.secondary.dark}`,
    marginTop: 15,
  },
  movieInfoCard: {
    width: '100%',
    minHeight: 600,
    backgroundColor: 'white',
    margin: 0,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  movieGenresText: {
    margin: '15px 0px',
  },
  movieGenresChips: {
    margin: '0px 5px 5px 0px',
  },
});

const SelectedMovieCard = ({ classes, loadingMovie, selectedMovie }) => {
  let movieOverviewBody = <CircularProgress color="secondary" />;
  let movieDescBody = <CircularProgress color="secondary" />;

  if (!loadingMovie && !Array.isArray(selectedMovie)) {
    movieOverviewBody = (
      <Fragment>
        <figure className={classes.moviePoster}>
          <Tooltip title="To Favourites" placement="left">
            <IconButton className={classes.favouritesBtn}>
              <StarBorder />
            </IconButton>
          </Tooltip>
          <img
            src={`http://image.tmdb.org/t/p/w500//${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            style={{
              width: '100%',
            }}
          />
        </figure>
      </Fragment>
    );

    movieDescBody = (
      <Fragment>
        <Typography align="left" component="h1" variant="headline" gutterBottom className={classes.movieTitle}>
          {selectedMovie.title}
        </Typography>
        <Typography component="h3" variant="subheading" gutterBottom className={classes.movieTagline}>
          {selectedMovie.tagline}
        </Typography>
        <Typography component="p" className={classes.movieDesc}>
          {selectedMovie.overview}
        </Typography>
        <Typography align="left" gutterBottom variant="title" className={classes.movieGenresText}>
          Genres:
        </Typography>
        {selectedMovie.genres.map(genre => (
          <Chip label={genre.name} key={`${selectedMovie.id}-${genre.id}`} className={classes.movieGenresChips} />
        ))}
      </Fragment>
    );
  }

  return (
    <Grow in mountOnEnter>
      <section className={classes.infoWrapper}>
        <Grid container spacing={24} className={classes.movieInfoCard}>
          <Grid item xl={4} lg={4} md={4} sm={5} xs={12}>
            { movieOverviewBody }
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={7} xs={12}>
            { movieDescBody }
          </Grid>
        </Grid>
      </section>
    </Grow>
  );
};

SelectedMovieCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  loadingMovie: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SelectedMovieCard);
