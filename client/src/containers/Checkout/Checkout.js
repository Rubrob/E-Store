import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Typography, withStyles, makeStyles } from '@material-ui/core'
import Shipping from './Shipping/Shipping'
import Billing from './Billing/Billing'
import CheckoutCart from './CheckoutCart/CheckoutCart'

const CustomTypography = withStyles(() => ({
  root: {
    marginBottom: 40,
    '@media (max-width: 599.5px)': {
      marginBottom: 20
    }
  }
}))(Typography)

const useStyles = makeStyles(() =>({
  checkout: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 1200,
    boxSizing: 'border-box',
    padding: '60px 20px',
    margin: 'auto'
  },
  content: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  forms: {
    width: '100%',
    maxWidth: 700,
    marginRight: 20,
  },
  cart: {
    width: '100%',
    maxWidth: 320,
  },
  '@media (max-width: 959.5px)': {
    content: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
    forms: {
      maxWidth: '100%',
      marginRight: 0
    },
    cart: {
      maxWidth: '100%',
    }
  }
}))

function Checkout(props) {
  const classes = useStyles()
  useEffect(() => {
    if(!props.cartProducts.length){
      props.history.push('/')
    }
  })

  return (
    <div className={classes.checkout}>
      <CustomTypography variant='h4' component='h2' align='center' children='CHECKOUT' />
      <div className={classes.content}>
        <div className={classes.forms}>
          <Shipping />
          <Billing />
        </div>
        <div className={classes.cart}>
          <CheckoutCart />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts
})

export default connect(mapStateToProps, null)(Checkout)