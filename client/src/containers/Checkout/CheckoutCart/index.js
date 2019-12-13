import React, {useEffect, useState} from "react";
import "./styles.sass";
import {connect} from "react-redux";
import {Typography, Card, Box} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import CheckoutProduct from "./CheckoutProduct";
import {totalRecalculation} from "redux/actions/cart";
import {freeIfZero} from "utils";
import cx from "classnames";


const CheckoutCart = ({
  currency,
  deliveryMethods,
  delivery,
  cartProducts,
  total,
  totalRecalculation
}) => {
  const [expand, setExpand] = useState(false)
  useEffect(() => {
    totalRecalculation(cartProducts)
  }, [cartProducts, totalRecalculation])

  const renderItems = () => (
    cartProducts.map((item, index) => (
      <CheckoutProduct key={index} info={item} currency={currency} />
    ))
  )

  return (
    <Card className="checkoutCartMain">
      <div className="checkoutCartHeader">
        <Typography variant="h5" component="h4">
          Order Summary
        </Typography>
        <div
          className="expandCheckoutCart"
          onClick={() => setExpand(!expand)}
        >
          {expand ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
      <div className="checkoutCartMainContent">
        <div className={cx("checkoutSummary", {pseudo: expand})}>
          <Typography variant="body2" component="div" color="textSecondary" gutterBottom>
            Subtotal: <span>{currency}{total}</span>
          </Typography>
          <Typography variant="body2" component="div" color="textSecondary">
            Delivery: <span>{freeIfZero(deliveryMethods[delivery], currency)}</span>
          </Typography>
          <Typography variant="h6" component="div">
            Total:
            <Typography component="span" color="error">
              {currency}{total + deliveryMethods[delivery]}
            </Typography>
          </Typography>
        </div>
        <Box className={expand ? "expand" : "hidden"}>
          {renderItems()}
        </Box>
      </div>
    </Card>
  )
}

export default connect(
  (state) => ({
    currency: state.products.currency,
    deliveryMethods: state.cart.deliveryMethods,
    cartProducts: state.cart.cartProducts,
    delivery: state.cart.defaultValues.delivery,
    total: state.cart.total
  }),
  (dispatch) => ({
    totalRecalculation: (cartProducts) => dispatch(totalRecalculation(cartProducts))
  })
)(CheckoutCart)
