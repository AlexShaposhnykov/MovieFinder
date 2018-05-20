import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

import Paper from '@material-ui/core/Paper';

const styles = {
  paperStyles: {
    width: '100%',
    minHeight: '100vh',
    borderRadius: '45px 45px 0px 0px',
    padding: '50px 40px',
  },
};

const MoviesWrapper = ({ classes, shouldAnimateIn }) => (
  <Fragment>
    <Slide
      in={shouldAnimateIn}
      direction="up"
      timeout={{
        enter: 350,
        leave: 300,
      }}
      mountOnEnter
      unmountOnExit
    >
      <Paper className={classes.paperStyles} />
    </Slide>
  </Fragment>
);

MoviesWrapper.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  shouldAnimateIn: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MoviesWrapper);
