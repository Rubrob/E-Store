import React from 'react'
import './ProductList.sass'
import { connect } from 'react-redux'
import SubHeader from '../SubHeader/SubHeader'
import Filter from './../SubHeader/Filter/Filter'
import ProductCard from './ProductCard/ProductCard'
import { useMediaQuery, Drawer } from '@material-ui/core'
import { toggleFilter } from '../../reducers/actions/trigers'

function ProductList(props) {

  const match = useMediaQuery('(max-width: 959.5px)')
  const { filtered, currency, searchedStr, filterOpen } = props
  const { toggle } = props

  return (
    <div className='ProductList'>
      {filtered.length > 0 && <SubHeader />}
      {match && <h2>{searchedStr}</h2>}
      <div className='flex-row'>
        {filtered.length > 0 && (match ? <Drawer open={filterOpen} onClose={toggle} children={<Filter />} /> : <Filter hide={filterOpen}/>)}
        <div className='ProductList-content'>
          <div className='ProductList-main'>{filtered.length < 1 ?
            <h2 className='ProductList-title'>
              I couldn't find any products your requested
            </h2> :
            filtered.map(p => <ProductCard key={p.id} product={p} currency={currency} />)}
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
  filterOpen: state.trigers.filter
})
const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleFilter())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)