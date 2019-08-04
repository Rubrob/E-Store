import React from 'react'
import './MobileAccount.sass'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AccountCircle } from '@material-ui/icons'
import { ListItem } from '@material-ui/core'
import MenuListItem from '../../MobileMenu/MobileDrawer/MenuListItem/MenuListItem'
import MenuListLink from '../../MobileMenu/MobileDrawer/MenuListLink/MenuListLink'
import { logOut } from '../../../../reducers/actions/auth'
import { closeMobileMenu } from './../../../../reducers/actions/trigers'

function MobileAccount(props) {
  const { isAuthenticated, token } = props
  const { closeMenu, logOut } = props
  const onLogOut = () => {
    closeMenu()
    logOut()
  }

  return (
    <>{isAuthenticated && token.length > 0 ?
      <MenuListItem title='My Account' icon={<AccountCircle />}>
        <MenuListLink text='Profile' parentLink={'/'} type='link' nodash link={'profile'}/>
        <MenuListLink text='Orders' parentLink={'/'} type='link' nodash link={'profile/orders'}/>
        <ListItem button className='listItem' onClick={onLogOut} children='Log Out' />
      </MenuListItem> :
      <ListItem button className='listItem listHeader JoinLogIn' onClick={closeMenu}>
        <Link to={`/register`} className='link' children='Join / Log In' />
      </ListItem>
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