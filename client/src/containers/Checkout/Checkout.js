import React, { useEffect } from 'react'
import './Checkout.sass'
import { connect } from 'react-redux'
import { Typography, withStyles } from '@material-ui/core'
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

const Checkout = (props) => {
  useEffect(() => {
    if(!props.cartProducts.length){
      props.history.push('/')
    }
  })

  return (
    <div className='checkout'>
      <CustomTypography variant='h4' component='h2' align='center' children='CHECKOUT' />
      <div className='checkout-content'>
        <div className='checkout-content-forms'>
          <Shipping />
          <Billing />
        </div>
        <div className='checkout-content-cart'>
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