import React, {useState} from 'react'
import './MenuListItem.sass'
import {
  Drawer,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'
import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons'
import {Link} from 'react-router-dom'


const MenuListItem = ({
  icon,
  title,
  link,
  onClose,
  ...props,
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

  const handleDrawerClose = () => {
    setDrawer({
      open: false,
      header: ''
    })
  }

  if(link){
    return (
      <ListItem
        button
        className='listItem'
        onClick={onClose}
      >
        <Link to={link} className='link'>
          {title}
        </Link>
      </ListItem>
    )
  }

  return (
    <>
      <ListItem
        button
        className='listItem'
        title={title}
        onClick={handleDrawerOpen}
      >
        {icon ? (
          <ListItemAvatar>
            <Avatar>
              {icon}
            </Avatar>
          </ListItemAvatar>
        ) : null}
        <ListItemText primary={title} />
        <KeyboardArrowRight />
      </ListItem>

      <Drawer
        variant='persistent'
        anchor='right'
        open={drawer.open}
        className='MobileMenu'
      >
        <ListItem
          button
          className='listItem listHeader'
          onClick={handleDrawerClose}
        >
          <KeyboardArrowLeft />
          <ListItemText
            // className='listHeader'
            primary={drawer.header}
          />
        </ListItem>
        {props.children}
      </Drawer>
    </>
  );
}

export default MenuListItem
