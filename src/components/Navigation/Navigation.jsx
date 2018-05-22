import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Star from '@material-ui/icons/Star';
import Search from '@material-ui/icons/Search';

import SearchBar from './SearchBar/SearchBar';

const styles = {
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
  },
};

// TODO: set dynamic badge
const Navigation = ({ classes, onSearchClick, isSearchOpen }) => (
  <Fragment>
    <AppBar position="fixed" color="primary">
      <Toolbar className={classes.toolbar}>
        <Tooltip title="Favorites">
          <IconButton color="inherit" aria-label="Favorites" className={classes.favoritesButton}>
            <Badge badgeContent={4} color="secondary">
              <Star />
            </Badge>
          </IconButton>
        </Tooltip>
        <Typography variant="title" color="inherit">
          MoviePicker
        </Typography>
        <IconButton
          color="inherit"
          aria-label="Favorites"
          className={classes.searchButton}
          onClick={onSearchClick}
        >
          <Search />
        </IconButton>
      </Toolbar>
      <SearchBar isOpen={isSearchOpen} />
    </AppBar>
  </Fragment>
);

Navigation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  onSearchClick: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Navigation);
