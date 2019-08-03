import React from 'react'
import './Cart.sass'
import { connect } from 'react-redux'
import { checkCartProducts } from '../../reducers/actions/cart'
import { KeyboardArrowRight } from '@material-ui/icons'
import { useMediaQuery } from '@material-ui/core'
import Toaster, { notify } from '../../components/Toaster/Toaster'
import CartItem from './CartItem/CartItem'

function Cart(props) {
  const match = useMediaQuery('(max-width: 959.5px)')
  const { cartProducts, products, total } = props

  const checkCart = () => {
    if(checkCartProducts(products, cartProducts)){
      props.history.push('/checkout')
    }else{
      notify('error', 'Some of the products in your cart are not available anymore!')
    }
  }

  const qty = cartProducts.reduce((acc, curr) => acc + (curr.qty), 0)
  const noItems = cartProducts.length < 1 && <div className='noProducts'>There are no items in your cart</div>
  const qtyLabel = qty < 2 ? `${qty} Product` : `${qty} Products`

  return (
    <div className='Cart'>
      <Toaster />
      <h1>CART</h1>
      {match && <div className='Cart-miniInfo'>
        <span>{qtyLabel} | </span>${total}
      </div>}
      <div className='Cart-main'>
        <div className='Cart-main-products'>
          {cartProducts.map((_, i) => <CartItem key={i} i={i} />)}
          {noItems}
        </div>
        <div className={match ? '' : 'Cart-main-toCheckout'}>
          {!match && <div className='Cart-main-toCheckout-main'>
            <h4>ORDER SUMMARY:</h4>
            <div>{qtyLabel}</div>
            <div>Total: ${total}</div>
          </div>}
          <button className='Cart-main-toCheckout-link' disabled={cartProducts.length < 1} onClick={checkCart}>
            CHECKOUT <KeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts,
  products: state.products.products,
  total: state.cart.total
})

export default connect(mapStateToProps, null)(Cart)