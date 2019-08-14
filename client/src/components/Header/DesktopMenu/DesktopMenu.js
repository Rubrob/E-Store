import React, { useState } from 'react'
import './DesktopMenu.sass'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { ampersand, tlc } from '../../../utils'

const DesktopMenu = ({title, menu}) => {

  const [open, setOpen] = useState(false)
  const openMenu = () => setOpen(true)
  const closeMenu = () => setOpen(false)

  const menuItems = menu.map(item => (
    <div key={item.id} className='categories_blocks'>
      <Typography variant='h6' component='div' gutterBottom className='categories_blocks-title'>
        <Link
          to={`/p/${tlc(title)}-${tlc(item.title)}`}
          children={ampersand(item.title)} />
      </Typography>
      <div className='subcategories_blocks'>
        {item.subcategories.map(subitem =>
        <Typography key={subitem} variant='body2' component='div' className='subcategories_blocks-title'>
          <Link
            to={`/p/${tlc(title)}-${tlc(item.title)}-${tlc(subitem)}`}
            onClick={closeMenu}
            children={ampersand(subitem)} />
        </Typography>
        )}
      </div>
    </div>
  ));

  return(
    <div className='DesktopMenu' onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <Typography variant='body1' component='div' className={open ? 'triger active' : 'triger'} children={title} />
      <div className={open ? 'menu open' : 'menu'} children={menuItems} />
    </div>
  );
}

export default DesktopMenu