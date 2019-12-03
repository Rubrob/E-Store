import React from 'react'
import { Link } from 'react-router-dom'
import { AccountCircle } from '@material-ui/icons'
import { ListItem } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import MenuListItem from '../../MobileMenu/MobileDrawer/MenuListItem/MenuListItem'
import MenuListLink from '../../MobileMenu/MobileDrawer/MenuListLink/MenuListLink'


const JoinLogInButton = withStyles(() => ({
  root: {
    textAlign: 'center',
    fontWeight: 600
  },
}))(ListItem)

const MobileAccount = ({
  isAuthenticated,
  onClose,
  logOut,
}) => {
  console.log(isAuthenticated)
  return (
    <>
      {isAuthenticated ?
        <MenuListItem title='My Account' icon={<AccountCircle />}>
          <MenuListLink text='Profile' type='link' link={'/profile'} closeMenu={onClose} />
          <MenuListLink text='Orders' type='link' link={'/profile/orders'} closeMenu={onClose} />
          <ListItem button className='listItem' onClick={() => {
            logOut()
            onClose()
          }}>
            Log Out
          </ListItem>
        </MenuListItem> :
        <JoinLogInButton button className='listItem listHeader' onClick={onClose}>
          <Link to={`/register`} className='link' children='Join / Log In' />
        </JoinLogInButton>
      }
    </>
  )
}

export default MobileAccount
