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
    const {
      cartProducts,
      total,
      currency,
      history
    } = this.props

    const renderCart = () => (
      !cartProducts.length ? (
      <Typography
        variant='subtitle1'
        component='div'
        align='center'
        children='There are no items in your cart'
      />
    ) :
      cartProducts.map((cartItem, i) => (
        <CartItem key={i} data={cartItem} />
      ))
    )

    const qty = cartProducts.reduce((acc, curr) => acc + (curr.qty), 0)
    const match = /(sm|xs)/.test(this.props.width)

    return (
      <div className='Cart'>
        <CustomTypography variant='h4' component='h2' align='center' children='CART' />
        {match &&
          <Typography
            component='div'
            align='center'
            color='textSecondary'
            className='Cart-miniInfo'
          >
            <Typography component='span' color='textPrimary'>
              {qty < 2 ? `${qty} Item` : `${qty} Items`}
            </Typography> | {currency}{total}
          </Typography>
        }
        <div className='Cart-main'>
          <div className='Cart-main-products'>
            {renderCart()}
          </div>
          <div className='Cart-main-toCheckout'>
            <div className='Cart-main-toCheckout-main'>
              <Typography variant='h6' component='h4' children='ORDER SUMMARY:' paragraph />
              <Typography variant='subtitle1' component='div'>
                {qty < 2 ? `${qty} Item` : `${qty} Items`}
              </Typography>
              <Typography
                variant='subtitle1'
                component='div'
                children={`Total: ${currency}${total}`}
              />
            </div>
            <CustomButton
              size='large'
              variant='contained'
              color={match ? 'default' : 'secondary'}
              disabled={cartProducts.length < 1}
              onClick={() => history.push('/checkout')}
            >
              Checkout <KeyboardArrowRight />
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