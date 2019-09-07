import React from 'react'
import './ProductList.sass'
import { connect } from 'react-redux'
import {
  useMediaQuery,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core'
import { toggleFilter } from '../../actions/trigers'
import SubHeader from '../SubHeader/SubHeader'
import Filter from './../SubHeader/Filter/Filter'
import ProductCard from './ProductCard/ProductCard'

const ProductList = (props) => {
  const match = useMediaQuery('(max-width: 959.5px)')
  const { filtered, currency, searchedStr, isfilterOpen, toggle } = props
  const productCards = filtered.map(product => <ProductCard key={product.id} product={product} currency={currency} />)

  return (
    <div className='productList'>
      <SubHeader />
      {(match && filtered.length > 0) && <Typography variant='h5' children={searchedStr} />}
      <div className='flexRow'>
        {match ?
          <SwipeableDrawer
            open={isfilterOpen}
            onClose={toggle}
            onOpen={toggle}
            children={<Filter />} /> :
          <Filter hide={isfilterOpen}/>}
        <div className='productList-content'>
          <div className='productList-content-main'>
            {filtered.length < 1 ?
              <Typography
                variant='h5'
                align='center'
                className='productList-empty'
                children={`I Couldn't Find Anything For Your Request`} />
            : productCards}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  filtered: state.products.filtered,
  searchedStr: state.products.searchedStr,
  currency: state.products.currency,
  isfilterOpen: state.trigers.filter
})
const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleFilter())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)