import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IconButton, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

function ShoppingBasket(props) {
  const { cartProducts } = props
  return (
    <Link to='/cart'>
      <IconButton color='inherit' aria-label='Shopping Cart'>
        <Badge color='secondary' badgeContent={cartProducts.length} invisible={cartProducts.length <= 0}>
          <ShoppingCart />
        </Badge>
      </IconButton>
    </Link>
  )
}

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts
})

export default connect(mapStateToProps, null)(ShoppingBasket);