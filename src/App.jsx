import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import HomePage from './containers/HomePage/HomePage';

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

const app = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route
            path="/"
            component={HomePage}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default app;
