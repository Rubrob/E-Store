import React, { useEffect, useState } from 'react'
import './CheckoutCart.sass'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import CheckoutProduct from './CheckoutProduct/CheckoutProduct'
import { freeIfZero, SetFixed } from '../../../utils'
import { totalRecalculation } from '../../../actions/cart'

function CheckoutCart(props) {

  const { fixed, setFixed } = SetFixed(140)
  const { currency, deliveryMethods, delivery, cartProducts, total, totalRecalculation } = props
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    totalRecalculation(cartProducts)
    window.addEventListener('scroll', setFixed)
    return () => { window.removeEventListener('scroll', setFixed) }
  }, [cartProducts, setFixed, totalRecalculation])

  return (
    <div className={`checkoutCartMain ${fixed ? 'fixed' : ''}`}>
      <div className='checkoutCartHeader'>
        <Typography variant='h6' component='h4' children='ORDER SUMMARY' />
        <div
          className='expandCheckoutCart'
          onClick={() => setExpand(!expand)}
          children={expand ? <ExpandLess /> : <ExpandMore />} />
      </div>

      <div className={`checkoutCartMainContent ${expand ? 'expand' : ''}`}>
        <div className='checkoutSummary'>
          <Typography variant='body2' component='div'>
            Subtotal <span children={`${currency}${total}`} />
          </Typography>
          <Typography variant='body2' component='div'>
            Delivery <span children={freeIfZero(deliveryMethods[delivery], currency)} />
          </Typography>
          <Typography variant='h6' component='div'>
            Total <span children={`${currency}${total + deliveryMethods[delivery]}`} />
          </Typography>
        </div>
        <div>
          {cartProducts.map((item, i) => <CheckoutProduct key={i} info={{...item, currency}}/>)}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currency: state.products.currency,
  deliveryMethods: state.cart.deliveryMethods,
  cartProducts: state.cart.cartProducts,
  delivery: state.cart.defaultValues.delivery,
  total: state.cart.total
})
const mapDispacthToProps = dispatch => ({
  totalRecalculation: (cartProducts) => dispatch(totalRecalculation(cartProducts))
})

export default connect(mapStateToProps, mapDispacthToProps)(CheckoutCart)