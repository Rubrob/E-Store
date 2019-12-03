import React from 'react'
import './Header.sass'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Hidden,
  Box
} from '@material-ui/core'
import SearchBox from './SearchBox/SearchBox'
import DesktopAccount from './Account/DesktopAccount/DesktopAccount'
import DesktopMenu from './DesktopMenu/DesktopMenu'
import MobileMenu from './MobileMenu/MobileMenu'
import ShoppingBasket from './ShoppingBasket/ShoppingBasket'
import { backdropFilterSupport } from './../../utils/index'
import logo from '../../logo.png'
import cx from 'classnames'

const Header = (props) => (
  <>
    <AppBar
      position='fixed'
      className={cx('Header', {
        blur: backdropFilterSupport()
      })}
      color='inherit'
      elevation={0}>
      <Toolbar className='toolbar'>
        <Box className='leftSide'>
          <Link
            to='/'
            className='logoButton'
            children={<img src={logo} className='logo' alt='logo' />}
          />
          <Hidden smDown>
            <DesktopMenu />
          </Hidden>
        </Box>
        <Box className='rightSide'>
          <SearchBox />
          <DesktopAccount />
          <ShoppingBasket />
          <MobileMenu />
        </Box>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </>
);

export default Header