import React, { useState } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Button, IconButton, Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";

const useStyles = makeStyles(theme => ({
  avatarBtn: {
    padding: "0 4px",
    margin: "0 6px"
  },
  avatar: {
    backgroundColor: "rgba(229, 229, 229, 0.4)",
    color: theme.palette.getContrastText("rgba(229, 229, 229, 0.4)")
  }
}));

const DesktopAccount = ({ isAuthenticated, logOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = evt => setAnchorEl(evt.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogOut = () => {
    logOut();
    handleClose();
  };
  const classes = useStyles();

  return isAuthenticated ? (
    <>
      <IconButton
        className={cx("hide", classes.avatarBtn)}
        onClick={handleOpen}
      >
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <Menu
        id="accountMenu"
        className="DesktopAccount-menu"
        anchorEl={anchorEl}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to="/profile/orders">
          <MenuItem onClick={handleClose}>Orders</MenuItem>
        </Link>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  ) : (
    <Button className="DesktopAccount" component={Link} to="/register">
      Join / Log In
    </Button>
  );
};

export default DesktopAccount;
