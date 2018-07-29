import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Navigation from 'components/Navigation/Navigation';

const Layout = ({ children }) => (
  <Fragment>
    <Navigation />
    <main style={{ paddingTop: '64px' }}>
      {children}
    </main>
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
