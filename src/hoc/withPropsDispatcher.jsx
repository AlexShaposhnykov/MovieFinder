import React, { Component } from 'react';

const globalState = {};

const withPropsDispatcher = (statePath = null) => WrappedComponent => (
  class extends Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          globalState={globalState[statePath] || globalState}
        />
      );
    }
  }
);

export default withPropsDispatcher;
