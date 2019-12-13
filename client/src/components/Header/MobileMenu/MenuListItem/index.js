import React, {useState} from 'react'
import './styles.sass'
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
  direction = 'front',
  title,
  link,
  ...props
}) => (
  <ListItem
    button
    title={title}
    onClick={action}
    {...props}
  >
    {link ? (
      link === 'none' ? title : (
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
  ...props
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

  return (
    <>
      <MenuItem
        title={title}
        link={link}
        className='listItem'
        action={link ? onClose : handleOpen}
        icon={icon}
        {...props}
      />
      {!link &&
        <Slide
          direction="left"
          in={state.open}
          mountOnEnter
          unmountOnExit
        >
          <div className='MobileMenu-drawer'>
            <MenuItem
              title={state.header}
              className='listItem -header'
              action={handleClose}
              direction='back'
            />
            {props.children}
          </div>
        </Slide>
      }
    </>
  );
}

export default MenuListItem
