import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

import SelectedMovieCard from '../../components/MoviePageComponents/SelectedMovieCard/SelectedMovieCard';

import RelMoviesCard from '../../components/MoviePageComponents/RelatedMoviesCard/RelMoviesCard';

import withContextPortal from '../../hoc/GlobalContext/withContextPortal';

import { initSelectedMovieFetch } from '../../store/selectedMovie/actions';

class MoviePage extends Component {
  static propTypes = {
    match: PropTypes.PropTypes.objectOf(PropTypes.any).isRequired,
    context: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  state = {
    lastMovie: this.props.match.params.id,
  }

  componentDidMount = () => {
    const { lastMovie } = this.state;
    const { dispatch } = this.props.context;

    dispatch(initSelectedMovieFetch, (lastMovie));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.lastMovie) {
      return {
        lastMovie: nextProps.match.params.id,
      };
    }
    return null;
  }

  // Update data on movie id(URL) change
  componentDidUpdate = (_, prevState) => {
    const { lastMovie } = this.state;
    const { dispatch } = this.props.context;

    if (prevState.lastMovie !== lastMovie) {
      dispatch(initSelectedMovieFetch, (lastMovie));
    }
  }

  render() {
    const { NewMovies, SelectedMovie } = this.props.context;
    const { moviesGenres } = NewMovies;
    const {
      selectedMovie,
      loading,
      loadingRecommended,
      recommendedMovies,
      loadingSimilar,
      similarMovies,
    } = SelectedMovie;

    let selectedMovieCard = <LinearProgress color="secondary" />;
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

export default withContextPortal(MoviePage);
