import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import MoviesWrapper from '../../components/HomePageComponents/MoviesWrapper/MoviesWrapper';

const styles = {
  headline: {
    margin: 50,
    color: '#FFFFFF',
  },
};

class HomePage extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  state = {
    renderMoviesWrapper: false,
  }

  componentDidMount = () => {
    this.setState({ renderMoviesWrapper: true });
  }

  render() {
    const { renderMoviesWrapper } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography
          variant="headline"
          component="h1"
          align="center"
          className={classes.headline}
        >
          Most Popular Movies
        </Typography>
        <MoviesWrapper shouldAnimateIn={renderMoviesWrapper} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
