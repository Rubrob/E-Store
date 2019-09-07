import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useMediaQuery, Typography, makeStyles } from '@material-ui/core'
import { SetFixed } from '../../utils'
import FilterTriger from './Filter/FilterTriger/FilterTriger'
import Sort from './Sort/Sort'

const useStyles = makeStyles(() => ({
  subHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
  },
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixed: {
    position: 'fixed',
    top: 64,
    left: 0,
    zIndex: 700,
    padding: '0 44px',
    boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, .14)',
  },
  title: {
    transition: '.4s'
  },
  '@media (max-width: 959.5px)': {
    subHeader: {
      padding: '5px 25px',
    },
    fixed: {
      padding: '0 25px'
    },
    main: {
      width: '100%'
    }
  },
  '@media (max-width: 599.5px)': {
    subHeader: {
      padding: '0 5px'
    },
    fixed: {
      top: 55,
      padding: '0 5px'
    }
  },
}))

const SubHeader = (props) => {
  const classes = useStyles()
  const match = useMediaQuery('(max-width: 959.5px)')
  const { filtered } = props
  const { fixed, setFixed } = SetFixed(40)
  const searchedQuantity = `${filtered.length} ${filtered.length > 1 ? 'Items' : 'Item'}`

  useEffect(() => {
    window.addEventListener('scroll', setFixed)
    return () => { window.removeEventListener('scroll', setFixed) }
  }, [setFixed])

  return (
    <div className={`${classes.subHeader} ${fixed ? classes.fixed : ''}`}>
      {!match && <Typography variant='h5' style={{ fontSize: fixed && 20 }} className={classes.title} children={props.searchedStr} />}
      <div className={classes.main}>
        {match ? <FilterTriger /> : <FilterTriger label='Filter'/>}
        {match && <Typography children={searchedQuantity} />}
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