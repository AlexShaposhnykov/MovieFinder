import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

const styles = theme => ({
  suggestionHr: {
    borderRadius: 60,
    border: '1px solid #eeeeee69',
  },
  suggestionItem: {
    height: 'auto',
    padding: 0,
    '&:not(last-child)': {
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  suggestionGenre: {
    marginRight: 5,
    backgroundColor: '#504f4f',
    color: `${theme.palette.primary.contrastText}`,
  },
});

const SearchSuggestion = ({
  classes,
  movieObj,
  genres,
  itemProps,
}) => (
  <Grow in>
    <MenuItem
      component="div"
      className={classes.suggestionItem}
    >
      <Link
        to={`/movie/${movieObj.id}`}
        href
        style={{
          padding: '10px 20px',
          display: 'block',
          width: '100%',
          height: '100%',
          color: '#2b2b2b',
          textDecoration: 'none',
        }}
        {...itemProps}
      >
        <Typography color="primary" component="h3" variant="subheading" >
          {movieObj.original_title}
        </Typography>
        <hr className={classes.suggestionHr} />
        <div style={{ overflowX: 'auto' }}>
          {genres.map(genre => (
            <Chip
              label={genre}
              key={`${movieObj.id}-${genre}-search`}
              style={{ pointerEvents: 'none' }}
              className={classes.suggestionGenre}
            />
          ))}
        </div>
      </Link>
    </MenuItem>
  </Grow>
);
SearchSuggestion.propTypes = {
  movieObj: PropTypes.objectOf(PropTypes.any).isRequired,
  itemProps: PropTypes.objectOf(PropTypes.any).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(SearchSuggestion);
