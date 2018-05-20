import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';

const styles = {
  inputStyles: {
    backgroundColor: 'white',
    padding: '8px 26px',
    borderRadius: '100px',
    boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2)',
  },
  inputWrapperStyles: {
    width: '100%',
    maxWidth: '800px',
  },
};

class SearchBar extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  state = {
    searchInputValue: '',
  }

  handleUserInput = (e) => {
    this.setState({ searchInputValue: e.target.value });
  }

  render() {
    const { searchInputValue } = this.state;
    const { isOpen, classes } = this.props;

    return (
      <Fragment>
        <Collapse in={isOpen} mountOnEnter unmountOnExit>
          <form
            noValidate
            onSubmit={e => e.preventDefault()}
            style={{
              padding: 20,
              textAlign: 'center',
              backgroundColor: 'rgb(255, 199, 179)',
            }}
          >
            <TextField
              type="search"
              InputLabelProps={{
                shrink: true,
              }}
              autoFocus
              placeholder="Search movies..."
              onChange={e => this.handleUserInput(e)}
              value={searchInputValue}
              margin="none"
              InputProps={{
                className: classes.inputStyles,
                disableUnderline: true,
              }}
              inputRef={(el) => { this.searchInput = el; }}
              className={classes.inputWrapperStyles}
            />
          </form>
        </Collapse>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SearchBar);
