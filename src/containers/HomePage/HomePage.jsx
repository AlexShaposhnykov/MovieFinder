import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoviesWrapper from '../../components/HomePageComponents/MoviesWrapper/MoviesWrapper';
import MoviesGrid from '../../components/HomePageComponents/MoviesGrid/MoviesGrid';

const styles = {
  headline: {
    margin: 50,
    color: '#FFFFFF',
  },
};

const HomePage = ({ classes }) => (
  <Fragment>
    <Typography
      variant="headline"
      component="h1"
      align="center"
      className={classes.headline}
    >
      Most Popular Movies
    </Typography>
    <MoviesWrapper shouldAnimateIn>
      <MoviesGrid />
    </MoviesWrapper>
  </Fragment>
);

HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(HomePage);
