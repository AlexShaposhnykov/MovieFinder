import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../../components/Navigation/Navigation';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    children: null,
  }

  state = {
    isSearchOpen: false,
  }

  handleSearchClick = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  }

  render() {
    const { isSearchOpen } = this.state;
    const { children } = this.props;

    return (
      <Fragment>
        <Navigation
          onSearchClick={this.handleSearchClick}
          isSearchOpen={isSearchOpen}
        />
        <main style={{ paddingTop: '64px' }}>
          {children}
        </main>
      </Fragment>
    );
  }
}
