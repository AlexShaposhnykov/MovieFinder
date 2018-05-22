import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorder from '@material-ui/icons/StarBorder';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
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
    border: '2px solid rgb(255, 199, 179)',
  },
  movieCardFooter: {
    padding: '20px',
    textAlign: 'center',
    maxWidth: '342px',
  },
  favouritesBtn: {
    position: 'absolute',
    zIndex: '20',
    color: '#FFFFFF',
    right: 5,
    top: 5,
  },
  genreChip: {
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

const MovieCard = ({
  classes,
  title,
  posterUrl,
  genres,
  isFavorite,
  movieId,
}) => (
  <Grow in>
    <Paper className={isFavorite
      ? [classes.movieCard, classes.movieCardSelected].join(' ')
      : classes.movieCard}
    >
      <Tooltip title="To Favourites" placement="left">
        <IconButton className={classes.favouritesBtn}>
          <StarBorder />
        </IconButton>
      </Tooltip>
      <Link to={`/${movieId}`} href style={{ textDecoration: 'none', zIndex: 10 }}>
        <img src={posterUrl} alt={title} style={{ width: '100%' }} />
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
  isFavorite: PropTypes.bool.isRequired,
  movieId: PropTypes.number.isRequired,
};

export default withStyles(styles)(MovieCard);
