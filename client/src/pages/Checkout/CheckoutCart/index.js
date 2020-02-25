import React, { useState } from "react";
import "./styles.sass";
import { connect } from "react-redux";
import { Typography, Card } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import CheckoutProduct from "./CheckoutProduct";
import { freeIfZero } from "utils/index";
import cx from "classnames";

const CheckoutCart = ({
  currency,
  deliveryMethods,
  selectedDelivery,
  cart,
  totalPrice
}) => {
  const [expand, setExpand] = useState(false);

  const renderItems = () =>
    cart.map((item, index) => (
      <CheckoutProduct key={index} info={item} currency={currency} />
    ));

  return (
    <Card className="checkoutCartMain">
      <div className="checkoutCartHeader">
        <Typography variant="h5" component="h4">
          Order Summary
        </Typography>
        <div className="expandCheckoutCart" onClick={() => setExpand(!expand)}>
          {expand ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
      <div className="checkoutCartMainContent">
        <div className={cx("checkoutSummary", { pseudo: expand })}>
          <Typography
            variant="body2"
            component="div"
            color="textSecondary"
            gutterBottom
          >
            Subtotal:{" "}
            <span>
              {currency}
              {totalPrice}
            </span>
          </Typography>
          <Typography variant="body2" component="div" color="textSecondary">
            Delivery:{" "}
            <span>
              {freeIfZero(deliveryMethods[selectedDelivery], currency)}
            </span>
          </Typography>
          <Typography variant="h6" component="div">
            Total:
            <Typography component="span" color="error">
              {currency}
              {totalPrice + deliveryMethods[selectedDelivery]}
            </Typography>
          </Typography>
        </div>
        <div className={expand ? "expand" : "hidden"}>{renderItems()}</div>
      </div>
    </Card>
  );
};

export default connect(state => ({
  currency: state.products.currency,
  deliveryMethods: state.cart.deliveryMethods,
  cart: state.cart.cart,
  selectedDelivery: state.cart.selectedDelivery,
  totalPrice: state.cart.totalPrice
}))(CheckoutCart);
