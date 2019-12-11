import React from 'react'
import './MobileMenu.sass'
import {
  IconButton,
  Hidden,
  SwipeableDrawer
} from '@material-ui/core'
import {MoreVert} from '@material-ui/icons'
// import {capitalize} from '../../../utils'
import MobileAccount from '../Account/MobileAccount/MobileAccount'
import MenuListItem from './MenuListItem/MenuListItem'


const MobileMenu = ({
  menu,
  open,
  onOpen,
  onClose,
  onLogOut,
  isAuthenticated
}) => {
  const renderMenuItems = (menu) => {
    let [gender, category] = menu[0].slug.split('-')
    return (
      <>
        <MenuListItem
          title={`All ${gender}'s ${category}`}
          link={`/p/${[gender, category].join('-')}`}
          onClose={onClose}
        />
        {menu.map(({title, slug}) => (
          <MenuListItem
            key={title}
            title={title}
            link={`/p/${slug}`}
            onClose={onClose}
          />
        ))}
      </>
    )
  }

  const renderMenu = (menu) => {
    return menu.map((item) => {
      if(item.categories !== undefined){
        return (
          <MenuListItem key={item.title} title={item.title}>
            {renderMenu(item.categories)}
          </MenuListItem>
        )
      }
      return (
        <MenuListItem key={item.title} title={item.title}>
          {renderMenuItems(item.subcategories)}
        </MenuListItem>
      )
    })
  }

  return (
    <Hidden mdUp>
      <IconButton
        color='inherit'
        onClick={onOpen}
        children={<MoreVert/>}
      />
      <SwipeableDrawer
        anchor='right'
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        className='MobileMenu'
      >
        <div>
          <MobileAccount
            onClose={onClose}
            isAuthenticated={isAuthenticated}
            logOut={onLogOut}
          />
          <div>
            {renderMenu(menu)}
          </div>
        </div>
      </SwipeableDrawer>
    </Hidden>
  )
}

export default MobileMenu
