import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

import { initMoviesFetch } from '../../../store/newMovies/actions';

import MoviesGallery from '../../../hoc/MoviesGallery/MoviesGallery';

import withContextPortal from '../../../hoc/GlobalContext/withContextPortal';

class MoviesGrid extends Component {
  static propTypes = {
    context: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  state = {
    hasMorePages: true,
  }

  handleMoviesLoad = () => {
    const { NewMovies } = this.props.context;
    const { loading, loadingGenres } = NewMovies;

    if (!loading && !loadingGenres) {
      initMoviesFetch(this.props.context);
    }
  }

  checkMoviesPages = () => {
    const { NewMovies } = this.props.context;
    const { curPage, lastPage } = NewMovies;

    this.setState({ hasMorePages: (curPage + 1 <= lastPage) });
  }

  render() {
    const { hasMorePages } = this.state;
    const { NewMovies } = this.props.context;
    const {
      popularMovies,
      moviesGenres,
      curPage,
    } = NewMovies;

    return (
      <InfiniteScroll
        pageStart={curPage}
        loadMore={this.handleMoviesLoad}
        hasMore={hasMorePages}
        element="div"
        loader={<CircularProgress color="secondary" key={1} />}
      >
        <MoviesGallery
          moviesList={popularMovies}
          moviesGenres={moviesGenres}
        />
      </InfiniteScroll>
    );
  }
}

export default withContextPortal(MoviesGrid);
