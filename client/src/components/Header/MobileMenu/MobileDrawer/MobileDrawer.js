import React from 'react'
import './MobileDrawer.sass'
import { SwipeableDrawer } from '@material-ui/core';
import { tlcWithUnderline } from '../../../../utils'
import MobileAccount from '../../Account/MobileAccount/MobileAccount'
import MenuListItem from './MenuListItem/MenuListItem'
import MenuListLink from './MenuListLink/MenuListLink'


const MobileDrawer = ({
  categories,
  open,
  onClose,
  onOpen,
  logOut,
  isAuthenticated
}) => {

  const renderSubcategories = (subcategories, categoryTitle, gender) => (
    subcategories.map((subcategory, index) => {
      const link = tlcWithUnderline([gender, categoryTitle, subcategory.title].join('-').toLowerCase())
      return (
        <MenuListLink
          key={index}
          text={subcategory.title}
          link={`/p/${link}`}
          closeMenu={onClose}
        />
      )
    })
  )

  return (
    <SwipeableDrawer anchor='right' open={open} onClose={onClose} onOpen={onOpen} className='mobileDrawer'>
      <div className='mobileDrawer-content' >
        <MobileAccount
          onClose={onClose}
          isAuthenticated={isAuthenticated}
          logOut={logOut}
        />

        {categories.map((gender, index) => (
          <MenuListItem key={index} title={gender.title}>
            {gender.categories.map((category, index) => {
              const link = tlcWithUnderline([gender.title, category.title].join('-').toLowerCase())
              return (
                <MenuListItem key={index} title={category.title}>
                  <MenuListLink
                    text={`All ${gender.title}'s ${category.title}`}
                    link={`/p/${link}`}
                    closeMenu={onClose}
                  />
                  {renderSubcategories(category.subcategories, category.title, gender.title)}
                </MenuListItem>
              )
            })}
          </MenuListItem>
        ))}
      </div>
    </SwipeableDrawer>
  )
}

export default MobileDrawer
