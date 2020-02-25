import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { removeSnackbar } from "redux/actions";
import { IconButton, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

export const renderCloseAction = callback => {
  return (
    <IconButton size="small" color="inherit" onClick={callback}>
      <ClearIcon />
    </IconButton>
  );
};

export const renderUndoAction = callback => {
  return (
    <Button color="inherit" size="small" onClick={callback}>
      Undo
    </Button>
  );
};

class Notifier extends Component {
  displayed = [];

  storeDisplayed = id => (this.displayed = [...this.displayed, id]);
  removeDisplayed = id =>
    (this.displayed = this.displayed.filter(key => id !== key));

  componentDidUpdate() {
    this.props.notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          this.props.closeSnackbar(key);
          return;
        }
        // Do nothing if snackbar is already displayed
        if (this.displayed.includes(key)) return;
        // Display snackbar using notistack
        this.props.enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, key) => {
            if (options.onClose) options.onClose(event, reason, key);
          },
          onExited: (event, key) => {
            this.props.removeSnackbar(key);
            this.removeDisplayed(key);
          }
        });
        // Keep track of snackbars that we've displayed
        this.storeDisplayed(key);
      }
    );
  }

  render() {
    return null;
  }
}

export default compose(
  withSnackbar,
  connect(
    store => ({
      notifications: store.notifications.notifications
    }),
    dispatch => bindActionCreators({ removeSnackbar }, dispatch)
  )
)(Notifier);
