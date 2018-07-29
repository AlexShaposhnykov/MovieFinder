import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Backdrop from '@material-ui/core/Backdrop';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import Search from '@material-ui/icons/Search';

import withContextPortal from 'hoc/GlobalContext/withContextPortal';

import SearchBar from './SearchBar/SearchBar';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-around',
    transition: 'transform .30s cubic-bezier(.4,0,.2,1)',
  },
  root: {
    flexGrow: 1,
  },
  searchButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  favoritesButton: {
    marginLeft: 20,
    marginRight: -12,
    color: `${theme.palette.secondary.light}`,
  },
  HomeHeading: {
    overflow: 'hidden',
    position: 'relative',
  },
  HomeLink: {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'all .2s ease',
    '&:hover': {
      color: `${theme.palette.secondary.main}`,
      '&::before': {
        transform: 'translateY(0%)',
      },
    },
    '&::before': {
      content: '"Home"',
      width: '100%',
      textAlign: 'center',
      backgroundColor: `${theme.palette.primary.main}`,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translateY(100%)',
      transition: 'all .3s cubic-bezier(0.36, 0.35, 0, 0.97)',
    },
  },
});

class Navigation extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    context: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  state = {
    isSearchOpen: false,
  }

  handleSearchClick = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  }

  handleOutsideClick = () => {
    this.setState({ isSearchOpen: false });
  }

  render() {
    const { isSearchOpen } = this.state;
    const { classes } = this.props;
    const { Favorites } = this.props.context;

    const favMoviesLength = Favorites.favMovies.length;

    return (
      <Fragment>
        <AppBar position="fixed" color="primary">
          <Toolbar className={classes.toolbar}>
            <Link to="/favorites" href style={{ color: 'inherit' }}>
              <Tooltip title="Favorites">
                <IconButton aria-label="Favorites" className={classes.favoritesButton}>
                  <Badge badgeContent={favMoviesLength} color="secondary">
                    {favMoviesLength !== 0 ? <Star /> : <StarBorder />}
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
            <Typography variant="title" color="inherit" className={classes.HomeHeading}>
              <Link to="/" href className={classes.HomeLink}>
                MoviePicker
              </Link>
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Favorites"
              className={classes.searchButton}
              onClick={this.handleSearchClick}
            >
              <Search />
            </IconButton>
          </Toolbar>
          <SearchBar isOpen={isSearchOpen} closeSearch={this.handleSearchClick} />
          { isSearchOpen
            && <Backdrop
              open={isSearchOpen}
              onClick={this.handleOutsideClick}
            />
          }
        </AppBar>
      </Fragment>
    );
  }
}

export default withContextPortal(withStyles(styles)(Navigation));
