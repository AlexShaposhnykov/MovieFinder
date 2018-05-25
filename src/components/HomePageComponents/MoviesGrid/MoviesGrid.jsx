import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';

import * as actions from '../../../store/actions/actionsExporter';

import MovieCard from '../../MovieCard/MovieCard';

import { getMovieGenres } from '../../../shared/utility';

class MoviesGrid extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    moviesGenres: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    loadingGenres: PropTypes.bool.isRequired,
    initMoviesFetch: PropTypes.func.isRequired,
    lastPage: PropTypes.number,
    curPage: PropTypes.number.isRequired,
  }

  static defaultProps = {
    lastPage: null,
  }

  state = {
    hasMorePages: true,
  }

  handleMoviesLoad = () => {
    if (!this.props.loading && !this.props.loadingGenres) {
      this.props.initMoviesFetch(this.props.curPage);
    }
  }

  checkMoviesPages = () => {
    this.setState({ hasMorePages: (this.props.curPage + 1 <= this.props.lastPage) });
  }

  render() {
    const { hasMorePages } = this.state;
    const {
      movies,
      moviesGenres,
      curPage,
    } = this.props;

    return (
      <InfiniteScroll
        pageStart={curPage}
        loadMore={this.handleMoviesLoad}
        hasMore={hasMorePages}
        element="div"
        loader={<CircularProgress color="secondary" key={1} />}
      >
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={24}>
              {movies.map(movieObj => (
                <Grid item key={`${movieObj.id + 1}-${movieObj.title}`}>
                  <MovieCard
                    movieObj={movieObj}
                    title={movieObj.title}
                    posterUrl={`http://image.tmdb.org/t/p/w342//${movieObj.poster_path}`}
                    movieId={movieObj.id}
                    genres={getMovieGenres(movieObj.genre_ids, moviesGenres)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.Home.popularMovies,
  moviesGenres: state.Home.moviesGenres,
  loading: state.Home.loading,
  loadingGenres: state.Home.loadingGenres,
  lastPage: state.Home.lastPage,
  curPage: state.Home.curPage,
});

const mapDispatchToProps = dispatch => ({
  initMoviesFetch: pageNum => dispatch(actions.initMoviesFetch(pageNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesGrid);
