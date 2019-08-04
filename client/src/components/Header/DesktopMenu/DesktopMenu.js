import React, { useState } from 'react'
import './DesktopMenu.sass'
import { Link } from 'react-router-dom'
import { ampersand, tlc } from '../../../utils'

const DesktopMenu = ({title, menu}) => {

  const [open, setOpen] = useState(false)
  const openMenu = () => setOpen(true)
  const closeMenu = () => setOpen(false)

  const menuItems = menu.map(item => (
    <div key={item.id} className='categories_blocks'>
      <h3>
        <Link
          to={`/p/${tlc(title)}-${tlc(item.title)}`}
          children={ampersand(item.title)} />
      </h3>
      <div className='subcategories_blocks'>
        {item.subcategories.map(subitem =>
          <Link
            key={subitem}
            to={`/p/${tlc(title)}-${tlc(item.title)}-${tlc(subitem)}`}
            onClick={closeMenu}
            children={ampersand(subitem)} />
        )}
      </div>
    </div>
  ));

  return(
    <div className='DesktopMenu' onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <div className={open ? 'triger active' : 'triger'} children={title} />
      <div className={open ? 'menu open' : 'menu'} children={menuItems} />
    </div>
  );
}

export default DesktopMenu