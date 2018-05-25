import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import SelectedMovieCard from '../../components/MoviePageComponents/SelectedMovieCard/SelectedMovieCard';

import RelMoviesCard from '../../components/MoviePageComponents/RelatedMoviesCard/RelMoviesCard';

import * as actions from '../../store/actions/actionsExporter';

class MoviePage extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadingRecommended: PropTypes.bool.isRequired,
    loadingSimilar: PropTypes.bool.isRequired,
    match: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.object,
    ])).isRequired,
    similarMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    moviesGenres: PropTypes.arrayOf(PropTypes.object).isRequired,
    recommendedMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    initSelectedMovieFetch: PropTypes.func.isRequired,
  }

  state = {
    lastMovie: this.props.match.params.id,
  }

  componentDidMount = () => {
    this.props.initSelectedMovieFetch(this.state.lastMovie);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.lastMovie) {
      return {
        lastMovie: nextProps.match.params.id,
      };
    }
    return null;
  }

  // Update data on movie id change
  componentDidUpdate = (_, prevState) => {
    if (prevState.lastMovie !== this.state.lastMovie) {
      this.props.initSelectedMovieFetch(this.state.lastMovie);
    }
  }

  render() {
    const {
      loading,
      selectedMovie,
      loadingRecommended,
      recommendedMovies,
      loadingSimilar,
      similarMovies,
      moviesGenres,
    } = this.props;

    let selectedMovieCard = <CircularProgress color="primary" />;
    if (!loading && !Array.isArray(selectedMovie)) {
      selectedMovieCard = (
        <SelectedMovieCard
          movieObj={selectedMovie}
          movieId={selectedMovie.id}
        />
      );
    }

    return (
      <Fragment>
        { selectedMovieCard }
        <RelMoviesCard
          relatedType="recommendedMovies"
          loading={loadingRecommended}
          moviesList={recommendedMovies.slice(0, 6)}
          moviesGenres={moviesGenres}
        />
        <RelMoviesCard
          relatedType="similarMovies"
          loading={loadingSimilar}
          moviesList={similarMovies.slice(0, 6)}
          moviesGenres={moviesGenres}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovie: state.MoviePage.selectedMovie,
  moviesGenres: state.Home.moviesGenres,
  loading: state.MoviePage.loading,
  loadingRecommended: state.MoviePage.loadingRecommended,
  recommendedMovies: state.MoviePage.recommendedMovies,
  loadingSimilar: state.MoviePage.loadingSimilar,
  similarMovies: state.MoviePage.similarMovies,
  loadingGenres: state.Home.loadingGenres,
  error: state.MoviePage.error,
  initSelectedMovieFetch: PropTypes.func.isRequired,
});

const mapDispatchToProps = dispatch => ({
  initSelectedMovieFetch: movieId => dispatch(actions.initSelectedMovieFetch(movieId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
