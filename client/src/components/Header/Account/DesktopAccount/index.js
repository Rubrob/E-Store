import React, {useState} from "react";
import "./styles.sass";
import {Link} from "react-router-dom";
import {
  Menu,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";


const DesktopAccount = ({isAuthenticated, logOut}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (evt) => setAnchorEl(evt.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogOut = () => {
    logOut()
    handleClose()
  };

  return (
    <>
      <Button
        className="DesktopAccount"
        color="primary"
        onClick={isAuthenticated ? handleOpen : null}
      >
          {isAuthenticated ? (
            <>
              <AccountCircle />
              <Typography variant="overline" className="DesktopAccount-text">
                My Account
              </Typography>
            </>
            ) : (
            <Typography variant="overline" className="DesktopAccount-text">
              <Link to="/register" children="Join / Log In" />
            </Typography>
          )}
      </Button>
      {isAuthenticated && anchorEl && (
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
          <MenuItem onClick={handleLogOut}>
            Log Out
          </MenuItem>
        </Menu>
      )}
    </>
  )
}

export default DesktopAccount
