import React from 'react'
import {AccountCircle} from '@material-ui/icons'
import MenuListItem, {MenuItem} from '../../MobileMenu/MenuListItem/MenuListItem'


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
      <MenuItem
        className='listItem'
        title='Orders'
        link='/profile/orders'
        action={onClose}
      />
      <MenuItem
        className='listItem'
        title='Profile'
        link='/profile'
        action={onClose}
      />
      <MenuItem
        className='listItem'
        title='Log Out'
        action={() => {
          logOut()
          onClose()
        }}
        pure
        direction={null}
      />
    </MenuListItem>
  ) : (
    <MenuItem
      className='listItem listHeader noIcon'
      action={onClose}
      title='Join / Log In'
      link='/register'
    />
  )
}

export default MobileAccount
