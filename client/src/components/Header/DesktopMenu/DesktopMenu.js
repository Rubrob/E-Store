import React, { useState } from 'react'
import './DesktopMenu.sass'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { tlcWithUnderline } from '../../../utils'

const DesktopMenu = ({title, menu}) => {

  const mapSubcategories = (subcategories, categoryTitle, gender) => (
    subcategories.map(subcategory => {
      const link = tlcWithUnderline([gender, categoryTitle, subcategory.title].join('-').toLowerCase())
      return (
        <Typography
          key={subcategory.title}
          variant='body2'
          component='div'
          className='subcategories_blocks-title'>
          <Link to={`/p/${link}`} onClick={closeMenu} children={subcategory.title} />
        </Typography>
      )
    })
  )

  const [open, setOpen] = useState(false)
  const openMenu = () => setOpen(true)
  const closeMenu = () => setOpen(false)

  const menuItems = menu.map(item => {
    const link = tlcWithUnderline([title, item.title].join('-').toLowerCase())
    return (
      <div key={item.title} className='categories_blocks'>
        <Typography variant='h6' component='div' gutterBottom className='categories_blocks-title'>
          <Link to={`/p/${link}`} children={item.title} />
        </Typography>
        <div className='subcategories_blocks'>
          {mapSubcategories(item.subcategories, item.title, title)}
        </div>
      </div>
    )
  });

  return(
    <div className='DesktopMenu' onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <Typography variant='body1' component='div' className={open ? 'triger active' : 'triger'} children={title} />
      <div className={`menu ${open ? 'open' : ''}`} children={menuItems} />
    </div>
  );
}

export default DesktopMenu