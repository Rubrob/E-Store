import React from 'react'
import './OrdersPage.sass'
import { Card, Typography } from '@material-ui/core'
import { totalCalculation } from '../../../utils'
import CheckoutProduct from '../../Checkout/CheckoutCart/CheckoutProduct/CheckoutProduct'
// import moment from 'moment'


const OrderPage = ({
  orders,
  currency
}) => {
  return (
    <div className='orderPage'>
      <Typography
        variant='h5'
        component='h2'
        align='center'
        className='orderPage-title'
        children='My Orders'
      />
      <div>
        {!orders.length ?
          <Typography
            variant='subtitle1'
            component='div'
            align='center'
            children="You don't have any orders yet"
          />
          :
          orders.map((item, itemI) => (
            <Card className='orderPage-block' key={itemI}>
              {item.map((p, i) => <CheckoutProduct key={i} withUrl info={{...p, currency}}/>)}
              <Typography variant='h6' component='div' className='orderPage-total'>
                Total: <span children={`${currency}${totalCalculation(item)}`} />
              </Typography>
              {/* <Typography align='left' variant='caption' style={{padding: 8, display:'block'}}>
                {moment(new Date()).format("MMM DD, YYYY HH:mm")} */}
                {/* todo */}
              {/* </Typography> */}
            </Card>
          ))}
      </div>
    </div>
  )
}

export default OrderPage
