import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'redux/store';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import {SnackbarProvider} from 'notistack';


render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        // preventDuplicate
        autoHideDuration={2000}
      >
        <App />
      </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));