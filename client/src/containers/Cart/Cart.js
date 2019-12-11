import React, { Component } from 'react'
import './Cart.sass'
import { connect } from 'react-redux'
import { withWidth, Button, Typography, Box } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import {
  checkCartProducts,
  totalRecalculation,
  changeProductQuantity,
  changeProductSize,
  deleteCartProduct,
} from '../../actions/cart'
import CartItem from './CartItem/CartItem'
import { LS } from './../../utils/index';

const CustomButton = withStyles(() => ({
  root: {
    justifyContent: 'space-between',
    padding: 20,
  }
}))(Button)


class Cart extends Component {
  componentDidMount() {
    this.props.totalRecalculation(this.props.cartProducts)
  }

  componentDidUpdate() {
    LS.set('CART', this.props.cartProducts)
    this.props.totalRecalculation(this.props.cartProducts)
  }

  componentWillUnmount() {
    this.props.checkCartProducts(this.props.products, this.props.cartProducts)
    LS.set('CART', this.props.cartProducts)
  }

  render() {
    const {
      cartProducts,
      total,
      count,
      currency,
      history,
      changeQuantity,
      changeSize,
      deleteItem,
    } = this.props

    const renderCart =  (
      !cartProducts.length ? (
        <Typography
          variant='subtitle1'
          component='div'
          align='center'
          children='There are no items in your cart'
        />
      ) :
      cartProducts.map((item) => (
        <CartItem
          key={item.id + item.size}
          data={item}
          currency={currency}
          onDelete={deleteItem}
          onChangeSize={changeSize}
          onChangeQty={changeQuantity}
        />
      ))
    )

    const totalCount = count < 2 ? `${count} Item` : `${count} Items`
    const match = /(sm|xs)/.test(this.props.width)

    return (
      <div className='Cart'>
        <Box mb={match ? 2 : 5}>
          <Typography variant='h4' component='h2' align='center'>
            CART
          </Typography>
        </Box>
        {match &&
          <Typography
            component='div'
            align='center'
            color='textSecondary'
            className='Cart-miniInfo'
          >
            <Typography component='span' color='textPrimary'>
              {totalCount}
            </Typography> | {currency}{total}
          </Typography>
        }
        <div className='Cart-main'>
          <div className='Cart-main-products'>
            {renderCart}
          </div>
          <div className='Cart-main-toCheckout'>
            <div className='Cart-main-toCheckout-main'>
              <Typography variant='h6' component='h4' children='ORDER SUMMARY:' paragraph />
              <Typography variant='subtitle1' component='div'>
                {totalCount}
              </Typography>
              <Typography
                variant='subtitle1'
                component='div'
                children={`Total: ${currency}${total}`}
              />
            </div>
            <CustomButton
              size='large'
              fullWidth
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
  total: state.cart.total,
  count: state.cart.count,
})
const mapDispacthToProps = dispatch => ({
  checkCartProducts: (products, cartProducts) => dispatch(checkCartProducts(products, cartProducts)),
  totalRecalculation: (cartProducts) => dispatch(totalRecalculation(cartProducts)),
  changeQuantity: value => dispatch(changeProductQuantity(value)),
  changeSize: value => dispatch(changeProductSize(value)),
  deleteItem: value => dispatch(deleteCartProduct(value))
})

export default connect(mapStateToProps, mapDispacthToProps)(withWidth()(Cart))