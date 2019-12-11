import React from 'react'
import {Link} from 'react-router-dom'
import {AccountCircle} from '@material-ui/icons'
import {ListItem, ListItemText} from '@material-ui/core'
import MenuListItem from '../../MobileMenu/MenuListItem/MenuListItem'


const MobileAccount = ({
  isAuthenticated,
  onClose,
  logOut,
}) => {
  return isAuthenticated ? (
    <MenuListItem
      title='My Account'
      icon={<AccountCircle />}
    >
      <MenuListItem
        title='Orders'
        link='/profile/orders'
        onClose={onClose}
      />
      <MenuListItem
        title='Profile'
        link='/profile'
        onClose={onClose}
      />
      <ListItem
        button
        className='listItem'
        onClick={() => {
          logOut()
          onClose()
        }}
      >
        Log Out
      </ListItem>
    </MenuListItem>
  ) : (
    <ListItem
      button
      className='listItem listHeader noIcon'
      onClick={onClose}
    >
      <ListItemText>
        <Link to='/register' className='link'>
          Join / Log In
        </Link>
      </ListItemText>
    </ListItem>
  )
}

export default MobileAccount
