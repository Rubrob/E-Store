import React, { useEffect, useState } from 'react'
import './CheckoutCart.sass'
import { connect } from 'react-redux'
import CheckoutProduct from './CheckoutProduct/CheckoutProduct'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { freeIfZero, SetFixed } from '../../../utils'
import { totalRecalculation } from './../../../reducers/actions/cart';

function CheckoutCart(props) {

  const { fixed, setFixed } = SetFixed(140)

  useEffect(() => {
    window.addEventListener('scroll', setFixed)
    return () => { window.removeEventListener('scroll', setFixed) }
  }, [setFixed])

  const { currency, deliveryMethods, delivery, cartProducts, total } = props
  const [expand, setExpand] = useState(false)

  return (
    <div className={`checkoutCartMain ${fixed ? 'fixed' : ''}`}>
      <div className='checkoutCartHeader'>
        <header>ORDER SUMMARY</header>
        <div className='expandCheckoutCart' onClick={() => setExpand(!expand)} children={expand ? <ExpandLess /> : <ExpandMore />} />
      </div>

      <div className={`checkoutCartMainContent ${expand ? 'expand' : ''}`}>
        <div className='checkoutSummary'>
          <div>Subtotal
            <span>{currency}{total}</span>
          </div>
          <div>Delivery
            <span>{freeIfZero(deliveryMethods[delivery], currency)}</span>
          </div>
          <div>Total
            <span>{currency}{total + deliveryMethods[delivery]}</span>
          </div>
        </div>
        <div>
          {cartProducts.map((product, i) => <CheckoutProduct key={i} info={{...product, currency}}/>)}
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
  total: totalRecalculation(state.cart.cartProducts)
})

export default connect(mapStateToProps, null)(CheckoutCart)