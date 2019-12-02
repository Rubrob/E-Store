import React from 'react'
import { connect } from 'react-redux'

import { Button, Typography, withStyles } from '@material-ui/core'
import { addFilter, removeFilter } from '../../../../actions/products'

const FilterButton = withStyles(() => ({
  root: {
    minWidth: 30
  }
}))(Button)

const FilterBlock = ({
  globalFilter,
  globalFilterType,
  currentFilter,
  label,
  itemsContent,
  classNameAsValue,
  className,
  addFilter,
  removeFilter
}) => {

  const setActive = (filter, value) => filter.indexOf(value) > -1

  const filterItems = currentFilter.map(filterItem => {
    const active = setActive(globalFilter[globalFilterType], filterItem)

    const handleFilter = () => {
      active ?
      removeFilter({
        filter: globalFilterType,
        value: filterItem
      }) :
      addFilter({
        filter: globalFilterType,
        value: filterItem
      })
    }

    const classes = `${className} ${classNameAsValue ? filterItem : ''} ${active ? 'active' : ''}`
    return (
      <FilterButton
        key={filterItem}
        className={classes}
        onClick={handleFilter}
        children={itemsContent ? itemsContent : filterItem}
      />
    )
  })
  return (
    <div className='FilterBlock'>
      <Typography variant='h6' className='FilterBlock-header' children={label} />
      <div className='FilterBlock-content'>{filterItems}</div>
    </div>
  )
}

const mapStateToProps = state => ({
  globalFilter: state.products.filter
})
const mapDispatchToProps = dispatch => ({
  addFilter: value => dispatch(addFilter(value)),
  removeFilter: value => dispatch(removeFilter(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterBlock)