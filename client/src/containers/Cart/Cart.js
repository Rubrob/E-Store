import React, { Component } from 'react'
import './Cart.sass'
import { connect } from 'react-redux'
import { withWidth, Button, Typography } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import { checkCartProducts, totalRecalculation } from '../../actions/cart'
import CartItem from './CartItem/CartItem'

const CustomButton = withStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    color: '#fff',
    '@media (max-width: 959.5px)': {
      borderRadius: 0,
     '&:not(:disabled)': {
       background: '#6e6e6e'
     }
    }
  }
}))(Button)

const CustomTypography = withStyles(() => ({
  root: {
    marginBottom: 40,
    '@media (max-width: 959.5px)': {
      marginBottom: 20
    }
  }
}))(Typography)


class Cart extends Component {

  componentDidMount() {
    this.props.totalRecalculation(this.props.cartProducts)
  }

  componentDidUpdate() {
    this.props.totalRecalculation(this.props.cartProducts)
  }

  componentWillUnmount() {
    this.props.checkCartProducts(this.props.products, this.props.cartProducts)
    localStorage.setItem('CART', JSON.stringify(this.props.cartProducts))
  }

  render() {
    const { cartProducts, total, currency, history } = this.props
    const mapCartItems = cartProducts.map((cartItem, i) => <CartItem key={i} data={cartItem} />)
    const cartContent = cartProducts.length < 1 ?
      <Typography
        variant='subtitle1'
        component='div'
        align='center'
        children={`There are no items in your cart`} />
    : mapCartItems

    const qty = cartProducts.reduce((acc, curr) => acc + (curr.qty), 0)
    const qtyLabel = qty < 2 ? `${qty} Item` : `${qty} Items`
    const match = this.props.width === 'sm' || 'xs'

    return (
      <div className='Cart'>
        <CustomTypography variant='h4' component='h2' align='center' children='CART' />
        {match &&
        <Typography variant='body1' component='div' align='center' className='Cart-miniInfo'>
          <Typography variant='body1' component='span' children={`${qtyLabel} | `} /> {currency}{total}
        </Typography>}
        <div className='Cart-main'>
          <div className='Cart-main-products'>
            {cartContent}
          </div>
          <div className='Cart-main-toCheckout'>
            <div className='Cart-main-toCheckout-main'>
              <Typography variant='h6' component='h4' children='ORDER SUMMARY:' paragraph/>
              <Typography variant='subtitle1' component='div' children={qtyLabel} />
              <Typography variant='subtitle1' component='div' children={`Total: ${currency}${total}`}  display='block' />
            </div>
            <CustomButton
              variant='contained'
              color='secondary'
              disabled={cartProducts.length < 1}
              onClick={() => history.push('/checkout')}>
              CHECKOUT <KeyboardArrowRight />
            </CustomButton>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts,
  products: state.products.products,
  currency: state.products.currency,
  total: state.cart.total
})
const mapDispacthToProps = dispatch => ({
  checkCartProducts: (products, cartProducts) => dispatch(checkCartProducts(products, cartProducts)),
  totalRecalculation: (cartProducts) => dispatch(totalRecalculation(cartProducts))
})

export default connect(mapStateToProps, mapDispacthToProps)(withWidth()(Cart))