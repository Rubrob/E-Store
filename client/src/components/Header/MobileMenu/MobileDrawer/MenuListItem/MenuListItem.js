import React, { useState } from 'react'
import './MenuListItem.sass'
import { Drawer, ListItem, ListItemText } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

function MenuListItem({children, title, icon}) {
  const [open, setOpen] = useState(false);
  const [header, setHeader] = useState('')

  const handleDrawerOpen = evt => {
    setOpen(true)
    setHeader(evt.currentTarget.title)
  }
  const handleDrawerClose = () => setOpen(false)

  return (
    <>
      <ListItem button className='listItem' title={title} onClick={handleDrawerOpen}>
        {icon}
        <ListItemText primary={title} />
        <KeyboardArrowRight />
      </ListItem>

      <Drawer variant='persistent' anchor='right' className='Drawer' open={open} classes={{paper: 'drawerPaper'}}>
        <ListItem button className='listItem listHeader' onClick={handleDrawerClose}>
          <KeyboardArrowLeft />
          <span>{header}</span>
        </ListItem>
        {children}
      </Drawer>
    </>
  );
}

export default MenuListItem