
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withContextPortal from './../GlobalContext/withContextPortal';

import { isInFavorites } from '../../shared/utility';
import { addToStorage, deleteFromStorage } from '../../store/favorites/actions';

const withFavoritesCheck = (WrappedComponent) => {
  class WithFavoritesCheck extends Component {
    static propTypes = {
      movieId: PropTypes.number.isRequired,
      movieObj: PropTypes.objectOf(PropTypes.any).isRequired,
      context: PropTypes.objectOf(PropTypes.any).isRequired,
    }

    state = {
      isFavorite: false,
    }

    componentDidMount = () => {
      const { Favorites } = this.props.context;
      const { favMovies } = Favorites;

      if (isInFavorites(favMovies, this.props.movieId) !== -1) {
        this.setState({ isFavorite: true });
      }
    }

    toggleFavoriteBtn = () => {
      const { isFavorite } = this.state;
      const { movieObj, movieId } = this.props;
      const { dispatch } = this.props.context;
        
      if (!isFavorite) {
        dispatch(addToStorage, (movieObj));
        this.setState(({ isFavorite: !isFavorite }));
      } else {
        dispatch(deleteFromStorage, (movieId));
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

  return withContextPortal(WithFavoritesCheck);
};

export default withFavoritesCheck;
