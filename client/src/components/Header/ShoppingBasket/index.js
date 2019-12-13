import React from "react";
import {Link} from "react-router-dom";
import {IconButton, Badge} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";


const ShoppingBasket = ({cart}) => (
  <Link to="/cart">
    <IconButton color="primary">
      <Badge
        color="secondary"
        badgeContent={cart.length}
      >
        <ShoppingCart />
      </Badge>
    </IconButton>
  </Link>
)

export default ShoppingBasket
