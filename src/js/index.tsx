import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { lightBlue, orange, grey } from '@material-ui/core/colors';

import App from "./containers/App";
import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[700],
    },
    secondary: {
      main: orange[700],
    },
    textColor: {
      light: grey[300],
      medium: grey[600],
      dark: grey[900],
    },
    error: {
      main: orange.A700,
    },
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

console.log(theme);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
