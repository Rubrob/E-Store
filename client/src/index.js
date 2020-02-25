import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App";
import theme from "./theme";
import store from "redux/store";
import "swiper/css/swiper.css";

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
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          preventDuplicate
          autoHideDuration={3000}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
