import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AccountCircle } from '@material-ui/icons'
import { ListItem } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import MenuListItem from '../../MobileMenu/MobileDrawer/MenuListItem/MenuListItem'
import MenuListLink from '../../MobileMenu/MobileDrawer/MenuListLink/MenuListLink'
import { logOut } from '../../../../actions/auth'
import { closeMobileMenu } from '../../../../actions/trigers'

const JoinLogInButton = withStyles(() => ({
  root: {
    textAlign: 'center',
    fontWeight: 600
  },
}))(ListItem)

const MobileAccount = (props) => {
  const { isAuthenticated, token } = props
  const { closeMenu, logOut } = props
  const onLogOut = () => {
    logOut()
    closeMenu()
  }

  return (
    <>{isAuthenticated && token.length > 0 ?
      <MenuListItem title='My Account' icon={<AccountCircle />}>
        <MenuListLink text='Profile' type='link' link={'/profile'}/>
        <MenuListLink text='Orders' type='link' link={'/profile/orders'}/>
        <ListItem button className='listItem' onClick={onLogOut} children='Log Out' />
      </MenuListItem> :
      <JoinLogInButton button className='listItem listHeader' onClick={closeMenu}>
        <Link to={`/register`} className='link' children='Join / Log In' />
      </JoinLogInButton>
    }</>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  closeMenu: () => dispatch(closeMobileMenu()),
  logOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileAccount);