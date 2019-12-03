import React, { useState } from 'react'
import './MenuListItem.sass'
import { Drawer, ListItem, ListItemText } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const MenuListItem = ({
  children,
  title,
  icon
}) => {
  const [drawer, setDrawer] = useState({
    open: false,
    header: ''
  })

  const handleDrawerOpen = (evt) => {
    setDrawer({
      open: true,
      header: evt.currentTarget.title
    })
  }

  const handleDrawerClose = () => setDrawer({open: false})

  return (
    <>
      <ListItem button className='listItem' title={title} onClick={handleDrawerOpen}>
        {icon}
        <ListItemText primary={title} />
        <KeyboardArrowRight />
      </ListItem>

      <Drawer variant='persistent' anchor='right' open={drawer.open} className='mobileDrawer'>
        <ListItem button className='listItem listHeader' onClick={handleDrawerClose}>
          <KeyboardArrowLeft />
          <span className='menuListItemHeader' children={drawer.header} />
        </ListItem>
        {children}
      </Drawer>
    </>
  );
}

export default MenuListItem