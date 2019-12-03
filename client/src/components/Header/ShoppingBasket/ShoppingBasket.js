import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IconButton, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

const ShoppingBasket = ({ cartProducts }) => (
  <Link to='/cart'>
    <IconButton color='primary'>
      <Badge
        color='secondary'
        badgeContent={cartProducts.length}
        invisible={!cartProducts.length}
      >
        <ShoppingCart />
      </Badge>
    </IconButton>
  </Link>
)

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts
})

export default connect(mapStateToProps, null)(ShoppingBasket);