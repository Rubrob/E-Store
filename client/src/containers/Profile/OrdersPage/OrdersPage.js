import React from 'react'
import './OrdersPage.sass'
import { connect } from 'react-redux'
import CheckoutProduct from '../../Checkout/CheckoutCart/CheckoutProduct/CheckoutProduct'
import { totalRecalculation } from './../../../reducers/actions/cart';

function OrderPage({ orders, currency }) {
  return (
    <div className='profileOrders'>
      <h1 className='profileOrders-title'>My Orders</h1>
      <div>
        {!orders.length ? <div className='profileOrders-empty'>You don't have any orders yet</div> :
          orders.map((item, itemI) =>
          <div className='profileOrders-block' key={itemI}>
            {item.map((p, i) => <CheckoutProduct key={i} withUrl info={p}/>)}
            <div className='profileOrders-block-total'>
              Total
              <span>{currency}{totalRecalculation(item)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currency: state.products.currency,
  orders: state.auth.orders
})

export default connect(mapStateToProps, null)(OrderPage)