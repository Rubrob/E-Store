import React from 'react'
import './Filter.sass'
import { connect } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import { addFilter, removeFilter, resetFilter, getFilters } from '../../../reducers/actions/products'
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

  const FilterBlock = ({ title, children }) => (
    <div className='FilterBlock'>
      <Typography variant='h6' component='div' className='FilterBlock-header' children={title} />
      <div className='FilterBlock-content'>{children}</div>
    </div>
  )

  const sizesBlock = bySize.map(size => {
    const active = setActive(filter, 'size')(size)
    return <FilterItem key={size} active={active} content={size} className='size' type='size' value={size}/>
  })

  const colorsBlock = byColor.map(color => {
    const active = setActive(filter, 'color')(color)
    return <FilterItem key={color} active={active} className={`color ${color}`} content={<Done fontSize='small' />} type='color' value={color}/>
  })

  return (
    <div className={`Filter ${hide ? 'hide' : ''}`}>
      <FilterBlock title='Color' children={colorsBlock} />
      <FilterBlock title='Size' children={sizesBlock} />
      <Button
        variant='contained'
        className='Filter-reset'
        onClick={resetFilter}
        children={'Reset'} />
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