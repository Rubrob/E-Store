import React from 'react'
import { connect } from 'react-redux'
import { Card, Typography, makeStyles } from '@material-ui/core'
import CheckoutProduct from '../../Checkout/CheckoutCart/CheckoutProduct/CheckoutProduct'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '1.4rem',
    margin: '20px 0',
    color: '#444'
  },
  block: {
    padding: 10,
    maxWidth: 800,
    margin: 'auto',
    marginBottom: 40
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,
    fontWeight: 600,
    '& span': {
      color: '#f05'
    }
  },
  '@media (max-width: 959.5px)': {
    block: {
      padding: 0
    }
  }
}))

function OrderPage({ orders, currency }) {
  const classes = useStyles()
  const totalRecalculation = item => item.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)
  return (
    <div className='profileOrders'>
      <Typography
        variant='h5'
        component='h2'
        align='center'
        className={classes.title}
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
            <Card className={classes.block} key={itemI}>
              {item.map((p, i) => <CheckoutProduct key={i} withUrl info={{...p, currency}}/>)}
              <Typography variant='h6' component='div' className={classes.total}>
                Total <span children={`${currency}${totalRecalculation(item)}`} />
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