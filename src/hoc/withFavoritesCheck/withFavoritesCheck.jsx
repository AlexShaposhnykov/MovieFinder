/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addToStorage, deleteFromStorage } from '../../store/actions/actionsExporter';

import { isInFavorites } from '../../shared/utility';

const withFavoritesCheck = (WrappedComponent) => {
  class WithFavoritesCheck extends Component {
    static propTypes = {
      movieId: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      onDeleteFromFavorites: PropTypes.func.isRequired,
      onAddToFavorites: PropTypes.func.isRequired,
    }

    state = {
      isFavorite: false,
    }

    componentDidMount = () => {
      if (isInFavorites(this.props.favMovies, this.props.movieId) !== -1) {
        this.setState({ isFavorite: true });
      }
    }

    toggleFavoriteBtn = () => {
      const { isFavorite } = this.state;
      const {
        movieObj,
        movieId,
        onAddToFavorites,
        onDeleteFromFavorites,
      } = this.props;

      if (!isFavorite) {
        onAddToFavorites(movieObj);
        this.setState(({ isFavorite: !isFavorite }));
      } else {
        onDeleteFromFavorites(movieId);
        this.setState(({ isFavorite: !isFavorite }));
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          favBtnClickFunc={this.toggleFavoriteBtn}
          isFavorite={this.state.isFavorite}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    favMovies: state.Favorites.favMovies,
  });

  const mapDispatchToProps = dispatch => ({
    onAddToFavorites: movieObj => dispatch(addToStorage(movieObj)),
    onDeleteFromFavorites: movieId => dispatch(deleteFromStorage(movieId)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFavoritesCheck);
};

export default withFavoritesCheck;
