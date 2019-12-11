import React, {useState} from 'react'
import './MenuListItem.sass'
import {
  Slide,
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


export const MenuItem = ({
  action = () => {},
  icon = null,
  title,
  direction = 'front',
  link,
  pure,
  ...props
}) => (
  <ListItem
    button
    title={title}
    onClick={action}
    {...props}
  >
    {link ? (
      !pure && (
        <Link to={link} className='link'>
          {title}
        </Link>
      )
    ) : (
      <>
        {direction === 'back' && <KeyboardArrowLeft />}
        {icon ? (
          <ListItemAvatar>
            <Avatar>
              {icon}
            </Avatar>
          </ListItemAvatar>
        ) : null}
        <ListItemText primary={title} />
        {direction === 'front' && <KeyboardArrowRight />}
      </>
    )}
  </ListItem>
)

const MenuListItem = ({
  icon,
  title,
  link,
  onClose,
  ...props,
}) => {
  const [state, setState] = useState({
    open: false,
    header: ''
  })

  const handleOpen = () => {
    setState({
      open: true,
      header: title
    })
  }

  const handleClose = () => {
    setState({
      open: false,
      header: ''
    })
  }

  if(link){
    return (
      <MenuItem
        className='listItem'
        action={onClose}
        link={link}
        title={title}
      />
    )
  }

  return (
    <>
      <MenuItem
        title={title}
        className='listItem'
        action={handleOpen}
        icon={icon}
      />
      <Slide
        direction="left"
        in={state.open}
        mountOnEnter
        unmountOnExit
      >
        <div className='MobileMenu-drawer'>
          <MenuItem
            title={state.header}
            className='listItem listHeader'
            action={handleClose}
            direction='back'
          />
          {props.children}
        </div>
      </Slide>
    </>
  );
}

export default MenuListItem
