import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorder from '@material-ui/icons/StarBorder';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grow from '@material-ui/core/Grow';

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
  favouritesBtn: {
    position: 'absolute',
    zIndex: '20',
    color: `#${theme.palette.secondary.dark}`,
    right: 5,
    top: 5,
    backgroundColor: `${theme.palette.primary.main}`,
  },
  genreChip: {
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

class MovieCard extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    movieId: PropTypes.number.isRequired,
  };

  state = {
    isFavourite: false,
  }

  handleLinkClick = () => {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      classes,
      title,
      posterUrl,
      genres,
      movieId,
    } = this.props;

    return (
      <Grow in>
        <Paper className={this.state.isFavorite
          ? [classes.movieCard, classes.movieCardSelected].join(' ')
          : classes.movieCard}
        >
          <Tooltip title="To Favourites" placement="left">
            <IconButton className={classes.favouritesBtn}>
              <StarBorder />
            </IconButton>
          </Tooltip>
          <Link
            to={`/movie/${movieId}`}
            onClick={this.handleLinkClick}
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
  }
}

export default withStyles(styles)(MovieCard);
