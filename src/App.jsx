import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#363237',
    },
    secondary: {
      main: '#d09683',
    },
  },
});

const app = () => (
  <MuiThemeProvider theme={theme}>
    <div className="App">
      <Button variant="raised" size="large" color="secondary">Hello</Button>
    </div>
  </MuiThemeProvider>
);

export default app;
