/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Downshift from 'downshift';

import { requestSearchResults } from '../../../store/actions/actionsExporter';
import SearchSuggestion from './SearchSuggestion/SearchSuggestion';

import { getMovieGenres } from '../../../shared/utility';

const styles = theme => ({
  searchWrapper: {
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgb(255, 199, 179)',
  },
  inputStyles: {
    backgroundColor: 'white',
    borderRadius: '100px',
  },
  coreInputStyles: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all .3s ease',
    '&:hover, &:focus': {
      boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    },
    borderRadius: 100,
    padding: '13px 26px',
  },
  inputWrapperStyles: {
    width: '100%',
    maxWidth: '800px',
  },
  suggestionsBox: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, 1%)',
    borderRadius: 8,
    width: 800,
    border: `7px double ${theme.palette.secondary.main}`,
    '@media (max-width: 857px)': {
      width: '95%',
    },
  },
});

const ENTER_KEYCODE = 13;

class SearchBar extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    onSearchStart: PropTypes.func.isRequired,
    moviesGenres: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
    closeSearch: PropTypes.func.isRequired,
    history: PropTypes.PropTypes.objectOf(PropTypes.any).isRequired,
  }

  state = {
    searchInputValue: '',
    selectedItem: [],
  }

  getSnapshotBeforeUpdate = () => {
    this.searchStartTimer = null;
    return null;
  }

  componentDidUpdate = () => {
    this.searchStartTimer = null;
  }

  handleUserInput = (e) => {
    clearTimeout(this.searchStartTimer);

    this.setState({ searchInputValue: e.target.value });

    this.searchStartTimer = setTimeout(this.initSearch, 400);
  }

  handleEnterPress = (e) => {
    const { searchResults } = this.props;

    if (e.keyCode === ENTER_KEYCODE && searchResults.length) {
      this.setState({
        searchInputValue: '',
        selectedItem: [searchResults[0]],
      });

      this.props.history.push(`/movie/${searchResults[0].id}`);
      this.props.closeSearch();
    }
  }

  initSearch = () => {
    if (this.state.searchInputValue !== '') {
      this.props.onSearchStart(this.state.searchInputValue);
    }
  }

  handleChange = (item) => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [item];
    }

    this.props.closeSearch();

    this.setState({
      searchInputValue: '',
      selectedItem,
    });
  }

  render() {
    const { searchInputValue } = this.state;
    const {
      classes,
      isOpen,
      searchResults,
      moviesGenres,
    } = this.props;

    return (
      <Fragment>
        <Collapse
          in={isOpen}
          mountOnEnter
          unmountOnExit
        >
          <Downshift
            isOpen={isOpen}
            onChange={this.handleChange}
            itemToString={item => (item ? item.title : '')}
          >
            {({ getItemProps }) => (
              <div className={classes.searchWrapper}>
                <TextField
                  type="search"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => this.handleUserInput(e)}
                  onKeyDown={e => this.handleEnterPress(e)}
                  placeholder="Search movies..."
                  value={searchInputValue}
                  margin="none"
                  autoFocus
                  InputProps={{
                    className: classes.inputStyles,
                    disableUnderline: true,
                  }}
                  inputProps={{
                    className: classes.coreInputStyles,
                  }}
                  inputRef={(el) => { this.searchInput = el; }}
                  className={classes.inputWrapperStyles}
                />
                {(isOpen && searchInputValue.length && searchResults.length) ? (
                  <Paper elevation={6} className={classes.suggestionsBox}>
                    {searchResults.slice(0, 6).map(item => (
                      <SearchSuggestion
                        itemProps={getItemProps({ item })}
                        key={`${item.id}-searchResult`}
                        movieObj={item}
                        genres={getMovieGenres(
                          (item.genre_ids || item.genres),
                          moviesGenres,
                        )}
                      />
                    ))}
                  </Paper>
                ) : null}
              </div>
            )}
          </Downshift>
        </Collapse>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.Search.searchResults,
  moviesGenres: state.Home.moviesGenres,
  loading: state.Search.loadingSearchResults,
});

const mapDispatchToProps = dispatch => ({
  onSearchStart: searchInputValue => dispatch(requestSearchResults(searchInputValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SearchBar)));
