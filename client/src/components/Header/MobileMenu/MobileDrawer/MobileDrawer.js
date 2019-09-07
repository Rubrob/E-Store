import React from 'react'
import './MobileDrawer.sass'
import { connect } from 'react-redux'
import { SwipeableDrawer } from '@material-ui/core';
import { tlcWithUnderline } from '../../../../utils'
import MobileAccount from '../../Account/MobileAccount/MobileAccount'
import MenuListItem from './MenuListItem/MenuListItem'
import MenuListLink from './MenuListLink/MenuListLink'

const MobileDrawer = ({ categories, open, onClose, onOpen }) => {

  const mapSubcategories = (subcategories, categoryTitle, gender) => (
    subcategories.map(subcategory => {
      const link = tlcWithUnderline([gender, categoryTitle, subcategory.title].join('-').toLowerCase())
      return <MenuListLink key={subcategory.title} text={subcategory.title} link={`/p/${link}`} />
    })
  )

  return (
    <SwipeableDrawer anchor='right' open={open} onClose={onClose} onOpen={onOpen} className='mobileDrawer'>
      <div className='mobileDrawer-content' >
        <MobileAccount />

        {categories.map(gender => <MenuListItem key={gender['_id']} title={gender.title}>
          {gender.categories.map(category => {
            const link = tlcWithUnderline([gender.title, category.title].join('-').toLowerCase())
            return (
              <MenuListItem key={category.title} title={category.title}>
                <MenuListLink text={`All ${gender.title}'s ${category.title}`} link={`/p/${link}`} />
                {mapSubcategories(category.subcategories, category.title, gender.title)}
              </MenuListItem>
            )
          })}
        </MenuListItem>)}
      </div>
    </SwipeableDrawer>
  )
}

const mapStateToProps = state => ({
  categories: state.products.categories
})

export default connect(mapStateToProps, null)(MobileDrawer)