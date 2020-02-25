import React from "react";
import "./styles.sass";
import cx from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Hidden } from "@material-ui/core";
import { logOut } from "redux/actions";
import { backdropFilterSupport } from "utils/index";
import SearchBox from "./SearchBox";
import DesktopAccount from "./Account/DesktopAccount";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import MobileMenu from "./MobileMenu";
import ShoppingBasket from "./ShoppingBasket";
import menuSchema from "constants/menuSchema.json";

const Header = ({ logOut, totalQuantity, isAuthenticated, ...props }) => {
  return (
    <>
      <AppBar
        position="fixed"
        className={cx("Header", {
          blur: backdropFilterSupport()
        })}
        color="inherit"
        elevation={0}
      >
        <Toolbar className="Header-toolbar">
          <div className="Header-leftSide">
            <Link to="/" className="Header-logo">
              <img src="/logo.png" alt="logo" />
            </Link>
            <Hidden smDown>
              <DesktopMenu menu={menuSchema} />
            </Hidden>
          </div>
          <div className="Header-rightSide">
            <SearchBox />
            <DesktopAccount isAuthenticated={isAuthenticated} logOut={logOut} />
            <ShoppingBasket total={totalQuantity} />
            <MobileMenu
              menu={menuSchema}
              isAuthenticated={isAuthenticated}
              onLogOut={logOut}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default connect(
  state => ({
    totalQuantity: state.cart.totalQuantity,
    isAuthenticated: state.auth.isAuthenticated
  }),
  {
    logOut
  }
)(Header);
