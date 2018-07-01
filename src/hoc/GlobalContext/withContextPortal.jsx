import React from 'react';
import { Context } from './WithGlobalContext';

const withContextPortal = WrappedComponent => props => (
  <Context.Consumer>
    {context => <WrappedComponent {...props} context={context} />}
  </Context.Consumer>
);

export default withContextPortal;
