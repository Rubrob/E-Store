import React from "react";
import "./styles.sass";
import {Link} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Hidden,
  Box
} from "@material-ui/core";
import cx from "classnames";
import SearchBox from "./SearchBox";
import DesktopAccount from "./Account/DesktopAccount";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import MobileMenu from "./MobileMenu";
import ShoppingBasket from "./ShoppingBasket";
import {backdropFilterSupport} from "utils";
import {connect} from "react-redux";
import {logOut} from "redux/actions/auth";
import {toggleMobileMenu} from "redux/actions/trigers";


const Header = ({
  cart,
  menu,
  isAuthenticated,
  logOut,
  onToggleMobileMenu,
  isMobileMenuOpen
}) => (
  <>
    <AppBar
      position="fixed"
      className={cx("Header", {
        blur: backdropFilterSupport()
      })}
      color="inherit"
      elevation={0}>
      <Toolbar className="toolbar">
        <Box className="leftSide">
          <Link
            to="/"
            className="logoButton"
            children={<img src="/logo.png" className="logo" alt="logo" />}
          />
          <Hidden smDown>
            <DesktopMenu menu={menu} />
          </Hidden>
        </Box>
        <Box className="rightSide">
          <SearchBox />
          <DesktopAccount
            isAuthenticated={isAuthenticated}
            logOut={logOut}
          />
          <ShoppingBasket cart={cart} />
          <MobileMenu
            menu={menu}
            open={isMobileMenuOpen}
            isAuthenticated={isAuthenticated}
            onClose={onToggleMobileMenu}
            onOpen={onToggleMobileMenu}
            onLogOut={logOut}
          />
        </Box>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </>
);

export default connect(
  (state) => ({
    cart: state.cart.cartProducts,
    menu: state.products.categories,
    isAuthenticated: state.auth.isAuthenticated,
    isMobileMenuOpen: state.trigers.state
  }),
  (dispatch) => ({
    onToggleMobileMenu: () => dispatch(toggleMobileMenu()),
    logOut: () => dispatch(logOut())
  })
)(Header)
