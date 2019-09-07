import React, { useState } from 'react'
import './DesktopAccount.sass'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Menu,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { logOut } from '../../../../actions/auth'

const DesktopAccount = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = evt => setAnchorEl(evt.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleLogOut = () => {
    logOut()
    handleClose()
  }

  const { isAuthenticated, token } = props
  const { logOut } = props
  const button = (isAuthenticated && token.length > 0 ?
    <>
      <AccountCircle />
      <Typography variant='overline' className='DesktopAccount-text' children='My Account' />
    </> :
    <Typography variant='overline' className='DesktopAccount-text'>
      <Link to='/register' children='Join / Log In' />
    </Typography>
  );

  return (
    <>
      <Button
        color='inherit'
        aria-controls='accountMenu'
        className='DesktopAccount'
        onClick={isAuthenticated ? handleClick : null}
        children={button} />
      <Menu
        id='accountMenu'
        className='DesktopAccount-menu'
        anchorEl={anchorEl}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
        <Link to={`/profile`}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to={`/profile/orders`}>
          <MenuItem onClick={handleClose}>Orders</MenuItem>
        </Link>
        <MenuItem onClick={handleLogOut} children={'Log Out'} />
      </Menu>
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(DesktopAccount)