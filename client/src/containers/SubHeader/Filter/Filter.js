import React from 'react'
import './Filter.sass'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import { resetFilter, getFilters } from '../../../actions/products'
import FilterBlock from './FilterBlock/FilterBlock'

const Filter = (props) => {
  const { searched, hide, resetFilter } = props
  const [byColor, bySize] = getFilters(searched, ['color', 'size'])

  return (
    <div className={`Filter ${hide ? 'hide' : ''}`}>
      <FilterBlock
        label='Color'
        globalFilterType='color'
        currentFilter={byColor}
        itemsContent={<Done fontSize='small' />}
        classNameAsValue
        className='color' />
      <FilterBlock
        label='Size'
        globalFilterType='size'
        currentFilter={bySize}
        className='size' />
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
})
const mapDispatchToProps = dispatch => ({
  resetFilter: () => dispatch(resetFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)