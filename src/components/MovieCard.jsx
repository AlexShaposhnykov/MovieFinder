import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grow from '@material-ui/core/Grow';

import withFavoritesCheck from 'hoc/withFavoritesCheck';

import FavoritesBtn from './FavoritesBtn';

const refreshPagePosition = () => window.scrollTo(0, 0);

const styles = theme => ({
  movieCard: {
    height: 'auto',
    maxWidth: 600,
    borderRadius: '15px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all .3s ease',
    border: '2px solid transparent',
    '&:hover': {
      boxShadow: '0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .2)',
    },
  },
  movieCardSelected: {
    border: `2px solid ${theme.palette.secondary.light}`,
  },
  movieCardFooter: {
    padding: '20px',
    textAlign: 'center',
    maxWidth: '342px',
  },
  genreChip: {
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const MovieCard = ({
  classes,
  title,
  posterUrl,
  genres,
  movieId,
  isFavorite,
  favBtnClickFunc,
}) => (
  <Grow in>
    <Paper className={isFavorite
      ? [classes.movieCard, classes.movieCardSelected].join(' ')
      : classes.movieCard}
    >
      <FavoritesBtn isFavorite={isFavorite} clickFunc={favBtnClickFunc} />
      <Link
        to={`/movie/${movieId}`}
        onClick={refreshPagePosition}
        href
        style={{ textDecoration: 'none', zIndex: 10 }}
      >
        <img src={posterUrl} alt={title} style={{ width: '100%', backgroundColor: '#eee' }} />
        <footer className={classes.movieCardFooter}>
          <Typography gutterBottom variant="headline" component="h2" noWrap>
            {title}
          </Typography>
          {genres.map(genre => (
            <Chip label={genre} className={classes.genreChip} key={`${movieId}-${genre}`} />
          ))}
        </footer>
      </Link>
    </Paper>
  </Grow>
);

MovieCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  movieId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  favBtnClickFunc: PropTypes.func.isRequired,
};

export default withFavoritesCheck(withStyles(styles)(MovieCard));
