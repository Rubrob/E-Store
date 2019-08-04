import React from 'react'
import './Filter.sass'
import { connect } from 'react-redux'
import { addFilter, removeFilter, resetFilter, getFilters } from '../../../reducers/actions/products'
import { Done } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import FilterItem from './FilterItem/FilterItem'

function Filter(props) {
  const { resetFilter } = props
  const { searched, filter, hide } = props

  const [byColor, bySize] = getFilters(searched, ['color', 'size'])

  const setActive = (filter, type) => (value) => {
    let active = false
    filter[type].forEach(fColor => active = (value === fColor) ? true : false)
    return active
  }

  const FilterBlock = (props) => {
    const { title, children } = props
    return (
      <div className='FilterBlock'>
        <div className='FilterBlock-header'>{title}</div>
        <div className='FilterBlock-content'>{children}</div>
      </div>
    )
  }

  return (
    <div className={`Filter ${hide ? 'hide' : ''}`}>
      <FilterBlock title='Color'>
          {byColor.map(color => {
            const active = setActive(filter, 'color')(color)
            return <FilterItem key={color} active={active} className={`color ${color}`} content={<Done />} type='color' value={color}/>
          })}
      </FilterBlock>
      <FilterBlock title='Size'>
          {bySize.map(size => {
            const active = setActive(filter, 'size')(size)
            return <FilterItem key={size} active={active} content={size} className='size' type='size' value={size}/>
          })}
      </FilterBlock>
      <Button className='Filter-reset' onClick={resetFilter} >Reset</Button>
    </div>
  )
}

const mapStateToProps = state => ({
  searched: state.products.searched,
  filter: state.products.filter,
})
const mapDispatchToProps = dispatch => ({
  addFilter: value => dispatch(addFilter(value)),
  removeFilter: value => dispatch(removeFilter(value)),
  resetFilter: () => dispatch(resetFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)