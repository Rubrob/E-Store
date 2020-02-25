import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const ShoppingBasket = props => (
  <IconButton color="primary" component={Link} to="/cart">
    <Badge color="error" badgeContent={props.total}>
      <ShoppingCartIcon />
    </Badge>
  </IconButton>
);

export default ShoppingBasket;
