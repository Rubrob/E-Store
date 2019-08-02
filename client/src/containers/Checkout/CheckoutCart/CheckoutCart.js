import React, { useEffect, useState } from 'react'
import './CheckoutCart.sass'
import { connect } from 'react-redux'
import CheckoutProduct from './CheckoutProduct/CheckoutProduct'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { freeIfZero, SetFixed } from '../../../utils'

function CheckoutCart(props) {

  const { fixed, setFixed } = SetFixed(140)

  useEffect(() => {
    window.addEventListener('scroll', setFixed)
    return () => { window.removeEventListener('scroll', setFixed) }
  }, [setFixed])

  const { currency, deliveryMethods, delivery, cartProducts } = props
  // const total = cartProducts.reduce((acc, curr) =>  acc + (curr.price * curr.qty), 0)

  const [expand, setExpand] = useState(false)

  return (
    <div className={`checkoutCartMain ${fixed ? 'fixed' : ''}`}>
      <div className='checkoutCartHeader'>
        <header>ORDER SUMMARY</header>
        <div className='expandCheckoutCart' onClick={() => setExpand(!expand)}>
          {expand ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>

      <div className={`checkoutCartMainContent ${expand ? 'expand' : ''}`}>
        <div className='checkoutSummary'>
          <div>Subtotal
            <span>{currency}{props.total}</span>
          </div>
          <div>Delivery
            <span>{freeIfZero(deliveryMethods[delivery], currency)}</span>
          </div>
          <div>Total
            <span>{currency}{props.total + deliveryMethods[delivery]}</span>
          </div>
        </div>
        <div>
          {cartProducts.map((product, i) => <CheckoutProduct key={i} info={product}/>)}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currency: state.cart.currency,
  deliveryMethods: state.cart.deliveryMethods,
  cartProducts: state.cart.cartProducts,
  delivery: state.cart.defaultValues.delivery,
  total: state.cart.total
})

export default connect(mapStateToProps, null)(CheckoutCart)