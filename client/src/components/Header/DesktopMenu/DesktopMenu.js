import React, { useState } from 'react'
import './DesktopMenu.sass'
import { Link } from 'react-router-dom'
import { Typography, Box } from '@material-ui/core'
import { tlcWithUnderline } from '../../../utils'
import { connect } from 'react-redux'
import cx from 'classnames'


const DesktopMenu = ({ menu }) => {
  const [state, setState] = useState(null)
  const openMenu = (item) => setState(item)
  const closeMenu = () => setState(null)

  const mapSubcategories = (subcategories, categoryTitle, gender) => (
    subcategories.map(({title}) => {
      const link = tlcWithUnderline([gender, categoryTitle, title].join('-'))
      return (
        <Typography
          key={title}
          variant='body2'
          color='textSecondary'
          className='subcategory__block-title'
        >
          <Link to={`/p/${link}`} onClick={closeMenu} children={title} />
        </Typography>
      )
    })
  )

  const menuItems = (menu) => menu.map((item) => {
    const link = tlcWithUnderline([state, item.title].join('-'))
    return (
      <Box key={item.title} className='category__block'>
        <Typography
          variant='h6'
          component='div'
          gutterBottom
          className='category__block-title'
          color='textPrimary'
        >
          <Link to={`/p/${link}`} children={item.title} />
        </Typography>
        <Box className='subcategory__block'>
          {mapSubcategories(item.subcategories, item.title, state)}
        </Box>
      </Box>
    )
  });

  const renderTrigers = menu.map(({title}) =>
    <Typography
      key={title}
      component='div'
      onMouseEnter={() => openMenu(title)}
      onMouseLeave={closeMenu}
      className={cx('triger', {active: state === title})}
      children={title}
    />
  )

  const renderMenu = menu.map(item => {
    if(state === item.title){
      return (
        <Box
          key={item.title}
          className={`DesktopMenu-menu`}
          children={menuItems(item.categories)}
          onMouseEnter={() => openMenu(item.title)}
          onMouseLeave={closeMenu}
        />
      )
    }
    return null
  })

  return(
    <>
      <Box className='DesktopMenu'>
        {renderTrigers}
      </Box>
      {renderMenu}
    </>
  );
}

const mapStateToProps = state => ({
  menu: state.products.categories
})

export default connect(mapStateToProps)(DesktopMenu)