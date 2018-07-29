
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Grow from '@material-ui/core/Grow';

import FavoritesBtn from 'components/FavoritesBtn';

import withFavoritesCheck from 'hoc/withFavoritesCheck';

const styles = theme => ({
  infoWrapper: {
    maxWidth: 1300,
    margin: '50px auto',
    padding: 10,
  },
  movieDescWrapper: {
    backgroundColor: '#212121',
  },
  movieUserScore: {
    color: `${theme.palette.primary.contrastText}`,
    marginTop: 20,
    '& > span': {
      border: `2px solid ${theme.palette.secondary.main}`,
      padding: '1px 10px',
      borderRadius: 30,
      color: `${theme.palette.secondary.main}`,
    },
  },
  moviePosterWrapper: {
    backgroundColor: 'white',
  },
  moviePoster: {
    position: 'relative',
    backgroundColor: '#eee',
    margin: 0,
    borderRadius: 15,
    height: '100%',
  },
  movieImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    border: '4px solid transparent',
  },
  movieImgSelected: {
    border: `4px solid ${theme.palette.secondary.light}`,
  },
  movieTitle: {
    color: `${theme.palette.primary.contrastText}`,
    '& > span': {
      marginLeft: 5,
      color: '#ababab',
    },
  },
  movieTagline: {
    borderLeft: '2px solid #eee',
    paddingLeft: 10,
    fontStyle: 'italic',
    color: 'rgba(212, 212, 212, 0.87)',
    backgroundColor: '#292929',
  },
  movieDesc: {
    padding: 30,
    border: `1px solid #${theme.palette.secondary.dark}`,
    marginTop: 15,
    color: `${theme.palette.primary.contrastText}`,
  },
  movieInfoCard: {
    width: '100%',
    minHeight: 600,
    margin: 0,
    borderRadius: 15,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  movieGenresText: {
    margin: '15px 0px',
    color: `${theme.palette.primary.contrastText}`,
  },
  movieGenresChips: {
    margin: '0px 5px 5px 0px',
    color: 'rgba(245, 245, 245, 0.87)',
    backgroundColor: '#545454',
  },
});

const SelectedMovieCard = ({
  classes,
  isFavorite,
  favBtnClickFunc,
  movieObj,
}) => (
  <Grow in mountOnEnter>
    <section className={classes.infoWrapper}>
      <Grid container spacing={24} className={classes.movieInfoCard}>
        <Grid item xl={4} lg={4} md={4} sm={5} xs={12} className={classes.moviePosterWrapper}>
          <figure className={classes.moviePoster}>
            <FavoritesBtn isFavorite={isFavorite} clickFunc={favBtnClickFunc} />
            <img
              src={`http://image.tmdb.org/t/p/w500//${movieObj.poster_path}`}
              alt={movieObj.title}
              className={isFavorite
                ? [classes.movieImg, classes.movieImgSelected].join(' ')
                : classes.movieImg
              }
            />
          </figure>
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={7} xs={12} className={classes.movieDescWrapper}>
          <Typography align="left" component="h1" variant="headline" gutterBottom className={classes.movieTitle}>
            {movieObj.title}
            <span>
              ({movieObj.release_date.split('-')[0]})
            </span>
          </Typography>
          <Typography component="h3" variant="subheading" gutterBottom className={classes.movieTagline}>
            {movieObj.tagline}
          </Typography>
          <Typography component="p" variant="subheading" className={classes.movieUserScore}>
            User Score: <span>{movieObj.vote_average}</span>
          </Typography>
          <Typography component="p" className={classes.movieDesc}>
            {movieObj.overview}
          </Typography>
          <Typography align="left" gutterBottom variant="title" className={classes.movieGenresText}>
            Genres:
          </Typography>
          {movieObj.genres.map(genre => (
            <Chip label={genre.name} key={`${movieObj.id}-${genre.id}`} className={classes.movieGenresChips} />
          ))}
        </Grid>
      </Grid>
    </section>
  </Grow>
);

SelectedMovieCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  favBtnClickFunc: PropTypes.func.isRequired,
  movieObj: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withFavoritesCheck(withStyles(styles)(SelectedMovieCard));
