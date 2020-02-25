import React from "react";
import "./styles.sass";
import { connect } from "react-redux";
import {
  Button,
  Typography,
  Box,
  Card,
  useMediaQuery
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  dispatchValidateCart,
  dispatchUpdateCartItem,
  dispatchDeleteCartItem
} from "redux/actions";
import CartItem from "./CartItem";
import { parsePrice } from "utils/index";

const CustomButton = withStyles(() => ({
  root: {
    justifyContent: "space-between",
    padding: 20
  }
}))(Button);

const Cart = ({
  cart,
  totalPrice,
  totalQuantity,
  currency,
  history,
  dispatchUpdateCartItem,
  dispatchDeleteCartItem,
  dispatchValidateCart,
  ...props
}) => {
  const matchWidth = useMediaQuery("(max-width: 959.5px)");
  const renderCart = () =>
    !cart.length ? (
      <Typography align="center">There are no items in your cart</Typography>
    ) : (
      cart.map(item => (
        <CartItem
          key={item._id + item.size}
          data={item}
          cartSkus={cart.map(({ sku }) => sku)}
          currency={currency}
          onDelete={dispatchDeleteCartItem}
          onChange={dispatchUpdateCartItem}
        />
      ))
    );

  return (
    <div className="Cart">
      <Box mb={matchWidth ? 2 : 5}>
        <Typography variant="h4" component="h2" align="center">
          CART
        </Typography>
      </Box>
      {matchWidth && (
        <Typography
          component="div"
          align="center"
          color="textSecondary"
          className="Cart-miniInfo"
        >
          <Typography component="span" color="textPrimary">
            {totalQuantity} Item{totalQuantity < 2 ? "" : "s"}
          </Typography>{" "}
          | {parsePrice(totalPrice, currency)}
        </Typography>
      )}
      <div className="Cart-main">
        <div className="Cart-main-products">{renderCart()}</div>
        <Card className="Cart-main-toCheckout">
          <div className="Cart-main-toCheckout-main">
            <Typography variant="h6" component="h4" paragraph>
              Order Summary:
            </Typography>
            <Typography variant="subtitle1" component="div">
              {totalQuantity} Item{totalQuantity < 2 ? "" : "s"}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Total: {parsePrice(totalPrice, currency)}
            </Typography>
          </div>
          <CustomButton
            size="large"
            fullWidth
            variant="contained"
            color={matchWidth ? "default" : "primary"}
            disabled={!cart.length}
            onClick={() => history.push("/checkout")}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Checkout
          </CustomButton>
        </Card>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    cart: state.cart.cart,
    currency: state.products.currency,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity
  }),
  {
    dispatchDeleteCartItem,
    dispatchUpdateCartItem,
    dispatchValidateCart
  }
)(Cart);
