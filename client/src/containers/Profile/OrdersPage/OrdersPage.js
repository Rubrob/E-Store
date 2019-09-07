import React from 'react'
import './OrdersPage.sass'
import { connect } from 'react-redux'
import { Card, Typography } from '@material-ui/core'
import { totalCalculation } from '../../../utils'
import CheckoutProduct from '../../Checkout/CheckoutCart/CheckoutProduct/CheckoutProduct'

const OrderPage = ({ orders, currency }) => {
  return (
    <div className='orderPage'>
      <Typography
        variant='h5'
        component='h2'
        align='center'
        className='orderPage-title'
        children='My Orders' />
      <div>
        {!orders.length ?
          <Typography
            variant='subtitle1'
            component='div'
            align='center'
            children={`You don't have any orders yet`} />
          :
          orders.map((item, itemI) => (
            <Card className='orderPage-block' key={itemI}>
              {item.map((p, i) => <CheckoutProduct key={i} withUrl info={{...p, currency}}/>)}
              <Typography variant='h6' component='div' className='orderPage-total'>
                Total <span children={`${currency}${totalCalculation(item)}`} />
              </Typography>
            </Card>
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currency: state.products.currency,
  orders: state.auth.orders
})

export default connect(mapStateToProps, null)(OrderPage)