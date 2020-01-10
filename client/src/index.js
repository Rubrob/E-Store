import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'redux/store';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import {SnackbarProvider} from 'notistack';


render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <SnackbarProvider
        // classes={{
        //   variantError: 'snackbar-error',
        //   variantSuccess: 'snackbar-success'
        // }}
        maxSnack={2}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'left',
        // }}
        // preventDuplicate
        autoHideDuration={3000}
      >
        <App />
      </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));