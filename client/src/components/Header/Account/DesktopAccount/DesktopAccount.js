import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Menu,
  MenuItem,
  Button,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'
import { logOut } from '../../../../actions/auth'

const StyledMenu = withStyles({
  paper: {
    top: '64px !important',
    width: 150,
    border: '1px solid #e5e5e5',
    borderRadius: '0 0 10px 10px',
    '@media (max-width: 959.5px)': {
      display: 'none'
    },
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const AccountButton = withStyles(() =>({
  root: {
    borderRadius: 25,
    padding: '0 10px',
    margin: '0 5px',
    '@media (max-width: 959.5px)': {
      display: 'none'
    },
  }
}))(Button)

const AccountText = withStyles(() => ({
  root: {
    marginLeft: 8,
    marginRight: 6,
  }
}))(Typography)

function DesktopAccount(props) {
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
      <AccountText variant='overline' children='My Account' />
    </> :
    <AccountText variant='overline'>
      <Link to='/register' children='Join / Log In' />
    </AccountText>
  );

  return (
    <>
      <AccountButton
        color='inherit'
        aria-controls='accountMenu'
        onClick={isAuthenticated ? handleClick : null}
        children={button} />
      <StyledMenu
        id='accountMenu'
        anchorEl={anchorEl}
        keepMounted
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
      </StyledMenu>
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