import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem } from '@material-ui/core'

const MenuListLink = ({link, text, closeMenu}) => (
  <ListItem button className='listItem' onClick={closeMenu}>
    <Link to={link} className='link' children={text} />
  </ListItem>
)

export default MenuListLink