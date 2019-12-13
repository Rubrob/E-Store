import React, {useState} from 'react'
import './styles.sass'
import {Link} from 'react-router-dom'
import {Typography, Box} from '@material-ui/core'
import cx from 'classnames'


const DesktopMenu = ({menu}) => {
  const [state, setState] = useState(null)

  const mapSubcategories = (subcategories) => (
    subcategories.map(({title, slug}) => {
      return (
        <Typography
          key={title}
          variant='body2'
          color='textSecondary'
          className='subcategory__block-title'
        >
          <Link to={`/p/${slug}`} onClick={() => setState(null)}>
            {title}
          </Link>
        </Typography>
      )
    })
  )

  const menuItems = (menu) =>
    menu.map((item) => {
      return (
        <Box key={item.title} className='category__block'>
          <Typography
            variant='h6'
            component='div'
            gutterBottom
            className='category__block-title'
            color='textPrimary'
          >
            <Link to={`/p/${item.slug}`} onClick={() => setState(null)}>
              {item.title}
            </Link>
          </Typography>
          <Box className='subcategory__block'>
            {mapSubcategories(item.subcategories)}
          </Box>
        </Box>
      )
  });

  const renderTrigers = () => (
    menu.map(({title}) => (
      <Typography
        key={title}
        component='div'
        onMouseEnter={() => setState(title)}
        onMouseLeave={() => setState(null)}
        className={cx('triger', {active: state === title})}
        children={title}
      />
    ))
  );

  const renderMenu = () => (
    menu.map((item) =>
      state === item.title && (
        <Box
          key={item.title}
          className='DesktopMenu-menu'
          onMouseEnter={() => setState(item.title)}
          onMouseLeave={() => setState(null)}
        >
          {menuItems(item.categories)}
        </Box>
      )
    )
  );

  return(
    <>
      <Box className='DesktopMenu'>
        {renderTrigers()}
      </Box>
      {renderMenu()}
    </>
  );
}

export default DesktopMenu
