import React, {useEffect} from "react";
import "./styles.sass";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import CheckoutCart from "./CheckoutCart";
import {
  submitShipping,
  changeDelivery,
  submitCheckout,
  sumbitBilling,
} from "redux/actions/cart";
import FormStepper from "components/FormStepper";


const CustomTypography = withStyles(() => ({
  root: {
    marginBottom: 40,
    "@media (max-width: 599.5px)": {
      marginBottom: 20
    }
  }
}))(Typography)


const Checkout = (props) => {
  useEffect(() => {
    if(!props.cart.length){
      props.history.push("/")
    }
  })

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
            delivery={props.delivery}
            deliveryMethods={props.deliveryMethods}
            changeDelivery={props.changeDelivery}
            initialValuesBilling={props.billing}
            onCheckout={props.onCheckout}
            shipping={props.shippingPreview}
          />
        </div>
        <div className="checkout-content-cart">
          <CheckoutCart />
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    cart: state.cart.cartProducts,
    currency: state.products.currency,
    shipping: state.auth.addresses.shipping,
    shippingPreview: state.cart.checkout.addresses.shipping,
    billingPreview: state.cart.checkout.addresses.billing,
    delivery: state.cart.defaultValues.delivery,
    deliveryMethods: state.cart.deliveryMethods,
    billing: state.auth.addresses.billing,
  }),
  (dispatch) => ({
    submitShipping: (value) => dispatch(submitShipping(value)),
    sumbitBilling: (value) => dispatch(sumbitBilling(value)),
    changeDelivery: (value) => dispatch(changeDelivery(value)),
    onCheckout: (data, callback) => dispatch(submitCheckout(data, callback))
  })
)(Checkout)
