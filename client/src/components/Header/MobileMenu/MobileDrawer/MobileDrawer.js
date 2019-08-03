import React from 'react'
import './MobileDrawer.sass'
import { connect } from 'react-redux'
import { tlc, ampersand } from '../../../../utils'
import MobileAccount from '../../Account/MobileAccount/MobileAccount'
import MenuListItem from './MenuListItem/MenuListItem'
import MenuListLink from './MenuListLink/MenuListLink'

function MobileDrawer(props) {
  return (
    <div role='presentation' className='MobileDrawer' >
      <MobileAccount />

      {props.categories.map(gender => <MenuListItem key={gender.title} title={gender.title}>
        {gender.categories.map(category => <MenuListItem key={category.id} title={category.title}>
          <MenuListLink
              key={category.id}
              text={`All ${tlc(gender.title)}'s ${tlc(category.title)}`}
              link={`/p/${tlc(gender.title)}-${tlc(category.title)}`}
              />
          {category.subcategories.map(subc =>
            <MenuListLink
              key={subc}
              text={ampersand(subc)}
              link={subc}
              parentLink={`/p/${tlc(gender.title)}-${tlc(category.title)}`}
              />
          )}
        </MenuListItem>)}
      </MenuListItem>)}
    </div>
  )
}

const mapStateToProps = state => ({
  categories: state.products.categories
})

export default connect(mapStateToProps, null)(MobileDrawer)