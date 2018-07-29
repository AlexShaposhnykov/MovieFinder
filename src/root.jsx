import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom';

import Layout from 'hoc/Layout';
import HomePage from 'pages/HomePage';
import MoviePage from 'pages/MoviePage';
import FavoritesPage from 'pages/FavoritesPage';

import withContextPortal from 'hoc/GlobalContext/withContextPortal';
import { initLocalStorage } from 'store/favorites/actions';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#363237',
      light: '#605b61',
      dark: '100a11',
      contrastText: '#ffffff',
    },
    background: {
      default: '#9d6856',
    },
    secondary: {
      main: '#d09683',
      light: '#ffc7b3',
      dark: '9d6856',
      contrastText: '#000000',
    },
  },
});

class Root extends PureComponent {
  static propTypes = {
    context: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  componentDidMount = () => {
    initLocalStorage(this.props.context);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route
                path="/movie/:id"
                component={MoviePage}
              />
              <Route
                path="/favorites"
                component={FavoritesPage}
              />
              <Route
                path="/"
                component={HomePage}
              />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withContextPortal(Root);
