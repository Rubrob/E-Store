import React from 'react'
import './Checkout.sass'
import { connect } from 'react-redux';
import Shipping from './Shipping/Shipping'
import Billing from './Billing/Billing'
import CheckoutCart from './CheckoutCart/CheckoutCart'

function Checkout(props) {
  if(!props.cartProducts.length){
    props.history.push('/')
  }

  return (
    <div className='Checkout'>
      <h1 className='Checkout-title'>CHECKOUT</h1>
      <div className='Checkout-content'>
        <main className='Checkout-content-forms'>
          <Shipping />
          <Billing />
        </main>
        <aside className='Checkout-content-cart'>
          <CheckoutCart />
        </aside>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts
})

export default connect(mapStateToProps, null)(Checkout)