import React, { useEffect } from 'react'
import './SubHeader.sass'
import { connect } from 'react-redux'
import { useMediaQuery, Typography, Box } from '@material-ui/core'
import { SetFixed } from '../../utils'
import FilterTriger from './Filter/FilterTriger/FilterTriger'
import Sort from './Sort/Sort'

const SubHeader = ({ filtered, searchedStr }) => {
  const match = useMediaQuery('(max-width: 959.5px)')
  const { fixed, setFixed } = SetFixed(40)
  const searchedQuantity = `${filtered.length} ${filtered.length > 1 ? 'Items' : 'Item'}`

  useEffect(() => {
    window.addEventListener('scroll', setFixed)
    return () => { window.removeEventListener('scroll', setFixed) }
  }, [setFixed])

  return (
    <Box
      className={`subHeader ${fixed ? 'fixed' : ''}`}
      boxShadow={fixed ? 4 : 0}>
      {!match && <Box fontSize={fixed ? 20 : 24} className='subHeader-title' children={searchedStr} />}
      <Box display='flex' justifyContent='space-between' alignItems='center' className='subHeader-main'>
        {match ? <FilterTriger /> : <FilterTriger label='Filter'/>}
        {match && <Typography children={searchedQuantity} />}
        {match ? <Sort /> : <Sort label='Sort By' />}
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  filtered: state.products.filtered,
  searchedStr: state.products.searchedStr
})

export default connect(mapStateToProps, null)(SubHeader)