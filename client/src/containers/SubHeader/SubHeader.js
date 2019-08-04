import React, { useEffect } from 'react'
import './SubHeader.sass'
import { connect } from 'react-redux'
import { SetFixed } from '../../utils'
import { useMediaQuery } from '@material-ui/core'
import FilterTriger from './Filter/FilterTriger/FilterTriger'
import Sort from './Sort/Sort'

function SubHeader(props) {

  const match = useMediaQuery('(max-width: 959.5px)')
  const { filtered } = props
  const { fixed, setFixed } = SetFixed(40)

  useEffect(() => {
    window.addEventListener('scroll', setFixed)
    return () => { window.removeEventListener('scroll', setFixed) }
  }, [setFixed])

  return (
    <div className={`SubHeader ${fixed ? 'fixed' : ''}`}>
      {!match && <h2 className='SubHeader-title' children={props.searchedStr} />}
      <div>
        {match ? <FilterTriger /> : <FilterTriger label='Filter'/>}
        {match && <div>{filtered.length} {filtered.length > 1 ? 'Items' : 'Item'}</div>}
        {match ? <Sort /> : <Sort label='Sort By' />}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  filtered: state.products.filtered,
  searchedStr: state.products.searchedStr
})

export default connect(mapStateToProps, null)(SubHeader)