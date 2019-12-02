import React, { useEffect, useState } from 'react'
import './CheckoutCart.sass'
import { connect } from 'react-redux'
import { Typography, Card, Box } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import CheckoutProduct from './CheckoutProduct/CheckoutProduct'
import { freeIfZero } from '../../../utils'
import { totalRecalculation } from '../../../actions/cart'

const CheckoutCart = (props) => {
  const {
    currency,
    deliveryMethods,
    delivery,
    cartProducts,
    total,
    totalRecalculation
  } = props
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    totalRecalculation(cartProducts)
  }, [cartProducts, totalRecalculation])

  return (
    <Card className='checkoutCartMain'>
      <div className='checkoutCartHeader'>
        <Typography variant='h5' component='h4' children='ORDER SUMMARY' />
        <div
          className='expandCheckoutCart'
          onClick={() => setExpand(!expand)}
          children={expand ? <ExpandLess /> : <ExpandMore />}
        />
      </div>

      <div className='checkoutCartMainContent'>
        <div className={`checkoutSummary ${expand ? 'pseudo' : ''}`}>
          <Typography variant='body2' component='div' color='textSecondary' gutterBottom>
            Subtotal:
            <span>
              {currency}{total}
            </span>
          </Typography>
          <Typography variant='body2' component='div' color='textSecondary'>
            Delivery: <span children={freeIfZero(deliveryMethods[delivery], currency)} />
          </Typography>
          <Typography variant='h6' component='div'>
            Total:
            <Typography component='span' color='error'>
              {currency}{total + deliveryMethods[delivery]}
            </Typography>
          </Typography>
        </div>

        <Box className={expand ? 'expand' : 'hidden'}>
          {cartProducts.map((item, i) => <CheckoutProduct key={i} info={{...item, currency}}/>)}
        </Box>

      </div>
    </Card>
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