import React, { useEffect } from "react";
import "./styles.sass";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CheckoutCart from "./CheckoutCart";
import {
  submitShipping,
  setDeliveryMethod,
  submitCheckout,
  sumbitBilling
} from "redux/actions";
import FormStepper from "components/FormStepper";

const CustomTypography = withStyles(() => ({
  root: {
    marginBottom: 40,
    "@media (max-width: 599.5px)": {
      marginBottom: 20
    }
  }
}))(Typography);

const Checkout = props => {
  useEffect(() => {
    if (!props.cart.length) {
      props.history.push("/");
    }
  });

  return (
    <div className="checkout">
      <CustomTypography variant="h4" component="h2" align="center">
        CHECKOUT
      </CustomTypography>
      <div className="checkout-content">
        <div className="checkout-content-forms">
          <FormStepper
            currency={props.currency}
            initialValuesShipping={props.shipping}
            shippingPreview={props.shippingPreview}
            billingPreview={props.billingPreview}
            submitShipping={props.submitShipping}
            sumbitBilling={props.sumbitBilling}
            selectedDelivery={props.selectedDelivery}
            deliveryMethods={props.deliveryMethods}
            setDeliveryMethod={props.setDeliveryMethod}
            initialValuesBilling={props.billing}
            onCheckout={props.submitCheckout}
            shipping={props.shippingPreview}
          />
        </div>
        <div className="checkout-content-cart">
          <CheckoutCart />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    cart: state.cart.cart,
    currency: state.products.currency,
    shipping: state.auth.addresses.shipping,
    shippingPreview: state.cart.checkout.addresses.shipping,
    billingPreview: state.cart.checkout.addresses.billing,
    selectedDelivery: state.cart.selectedDelivery,
    deliveryMethods: state.cart.deliveryMethods,
    billing: state.auth.addresses.billing
  }),
  { submitShipping, sumbitBilling, setDeliveryMethod, submitCheckout }
)(Checkout);
