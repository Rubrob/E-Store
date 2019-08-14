import React from 'react'
import { connect } from 'react-redux'
import {
  useMediaQuery,
  SwipeableDrawer,
  Typography,
  makeStyles
} from '@material-ui/core'
import { toggleFilter } from '../../reducers/actions/trigers'
import SubHeader from '../SubHeader/SubHeader'
import Filter from './../SubHeader/Filter/Filter'
import ProductCard from './ProductCard/ProductCard'

const useStyles =makeStyles(() => ({
  productList: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400,
    marginTop: 100,
    padding: '0 60px',
    boxSizing: 'border-box',
  },
  flexRow: {
    display: 'flex',
    width: '100%'
  },
  content: {
    width: '100%',
    marginBottom: 100,
  },
  main: {
    paddingTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  empty: {
    width: '100%',
    padding: 20,
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  '@media (max-width: 959.5px)': {
    productList: {
      width: '100%',
      padding: 0,
      alignItems: 'center'
    },
  },
  '@media (max-width: 599.5px)': {
    productList: {
      marginTop: 40
    }
  }
}))

function ProductList(props) {

  const classes = useStyles()

  const match = useMediaQuery('(max-width: 959.5px)')
  const { filtered, currency, searchedStr, isfilterOpen } = props
  const { toggle } = props
  const productCards = filtered.map(p => <ProductCard key={p.id} product={p} currency={currency} />)

  return (
    <div className={classes.productList}>
      {filtered.length > 0 && <SubHeader />}
      {(match && filtered.length > 0) && <Typography variant='h5' children={searchedStr} />}
      <div className={classes.flexRow}>
        {filtered.length > 0 && (match ?
          <SwipeableDrawer
            open={isfilterOpen}
            onClose={toggle}
            onOpen={toggle}
            children={<Filter />} /> :
          <Filter hide={isfilterOpen}/>)}
        <div className={classes.content}>
          <div className={classes.main}>
            {filtered.length < 1 ?
              <Typography
                variant='h5'
                align='center'
                className={classes.empty}
                children={`I Couldn't Find Anything For Your Request`} /> : productCards}
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