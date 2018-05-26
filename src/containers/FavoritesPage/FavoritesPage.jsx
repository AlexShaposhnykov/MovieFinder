import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoviesGallery from '../../hoc/MoviesGallery/MoviesGallery';

import { initMoviesGenresFetch } from '../../store/actions/HomePage';

const styles = theme => ({
  headingWrapper: {
    height: 200,
    position: 'relative',
    backgroundColor: `${theme.palette.primary.main}`,
    borderBottom: `2px solid #${theme.palette.secondary.dark}`,
  },
  heading: {
    backgroundColor: `${theme.palette.secondary.main}`,
    width: 500,
    color: `${theme.palette.secondary.contrastText}`,
    margin: '0 auto',
    padding: 13,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '19px 19px 90px 90px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
    transform: 'translate(-50%, -50%)',
  },
  favoritesShowcaseWell: {
    padding: '90px 15px',
    width: '100%',
    overflow: 'hidden',
    boxShadow: 'inset 0px 0px 20px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
});

class FavoritesPage extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    onFavoritesLoad: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    moviesGenres: PropTypes.arrayOf(PropTypes.any).isRequired,
    favMovies: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  componentDidMount = () => {
    const { moviesGenres, onFavoritesLoad } = this.props;

    if (moviesGenres.length === 0) {
      onFavoritesLoad();
    }
    window.scrollTo(0, 0);
  }

  render() {
    const {
      classes,
      favMovies,
      moviesGenres,
      loading,
    } = this.props;

    return (
      <Fragment>
        <div className={classes.headingWrapper}>
          <Fade in>
            <Typography color="primary" align="center" variant="headline" className={classes.heading}>
              Favorite Movies
            </Typography>
          </Fade>
        </div>
        <div className={classes.favoritesShowcaseWell}>
          <MoviesGallery
            loading={loading}
            moviesList={favMovies}
            moviesGenres={moviesGenres}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favMovies: state.Favorites.favMovies,
  moviesGenres: state.Home.moviesGenres,
  loading: state.Home.loadingGenres,
});

const mapDispatchToProps = dispatch => ({
  onFavoritesLoad: () => dispatch(initMoviesGenresFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FavoritesPage));
