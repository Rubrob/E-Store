import React, { useState } from 'react'
import './DesktopAccount.sass'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';
import { logOut } from '../../../../reducers/actions/auth';

const StyledMenu = withStyles({
  paper: {
    top: '67px !important',
    width: 150,
    border: '1px solid #e5e5e5',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px'
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

function DesktopAccount(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = evt => setAnchorEl(evt.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const { isAuthenticated, token } = props
  const button = (isAuthenticated && token.length > 0 ?
    <>
      <AccountCircle />
      <span className='accountText myAccount' children={'My Account'} />
    </> :
    <Link to='/register' className='accountText' children={'Join / Log In'} />
  );

  return (
    <>
      <Button
        color='inherit'
        aria-controls='accountMenu'
        aria-haspopup='true'
        className='Account'
        onClick={isAuthenticated ? handleClick : null}
        children={button} />
      <StyledMenu
        id='accountMenu'
        className='accountMenu'
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
        <MenuItem onClick={() => {
            props.logOut()
            handleClose()
          }}>Log Out
        </MenuItem>
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