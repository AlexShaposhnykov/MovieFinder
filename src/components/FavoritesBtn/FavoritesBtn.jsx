import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  favouritesBtn: {
    position: 'absolute',
    zIndex: '20',
    color: `#${theme.palette.secondary.dark}`,
    right: 10,
    top: 10,
    backgroundColor: `${theme.palette.primary.main}`,
  },
});

const FavoritesBtn = ({ classes, isFavorite, clickFunc }) => (
  <Tooltip
    title={isFavorite ? 'Remove From Favorites' : 'To Favorites'}
    placement="left"
  >
    <IconButton className={classes.favouritesBtn} onClick={clickFunc}>
      {isFavorite ? <Star /> : <StarBorder />}
    </IconButton>
  </Tooltip>
);

FavoritesBtn.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  clickFunc: PropTypes.func.isRequired,
};

export default withStyles(styles)(FavoritesBtn);
