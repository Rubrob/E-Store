import React, { useState } from 'react'
import { Drawer, ListItem, ListItemText } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

import { withStyles, makeStyles } from '@material-ui/core/styles';

const CustomDrawer = withStyles(() => ({
  root: {
    width: 250,
    color: '#444',
    '& .MuiDrawer-paper': {
      width: 'inherit',
      background: '#f7f7f7',
      overflowY: 'visible',
    }
  }
}))(Drawer)

const useStyles = makeStyles({
  listHeader: {
    width: '100%',
    marginLeft: -24,
    textAlign: 'center',
    fontWeight: 700,
  }
})

function MenuListItem({children, title, icon}) {
  const classes = useStyles()
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

      <CustomDrawer variant='persistent' anchor='right' className='Drawer' open={open}>
        <ListItem button className='listItem listHeader' onClick={handleDrawerClose}>
          <KeyboardArrowLeft />
          <span className={classes.listHeader} children={header} />
        </ListItem>
        {children}
      </CustomDrawer>
    </>
  );
}

export default MenuListItem