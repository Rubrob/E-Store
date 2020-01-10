import React from "react";
import "./styles.sass";
import {reduxForm} from "redux-form";
import {Typography, Box, Card} from "@material-ui/core";
import {Lock} from "@material-ui/icons";
import DeliveryBox from "./DeliveryBox";
import CheckoutForm from "../CheckoutForm";
import {validate} from "validation";


const Shipping = ({
  handleSubmit,
  invalid,
  submitting,
  pristine,
  onSubmit,
  delivery,
  currency,
  deliveryMethods,
  changeDelivery,
  buttons
}) => {
  return (
    <Card className="shipping">
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <CheckoutForm type="shipping" />
        <Typography className="shippingNote" variant="caption">
          <Lock fontSize="inherit" />
            Your privacy is important to us. We will only contact you if there is an issue with your order.
        </Typography>
        <DeliveryBox
          onChange={changeDelivery}
          methods={deliveryMethods}
          selected={delivery}
          currency={currency}
        />
        <Box display='flex' justifyContent="flex-end" mt={3} width={1}>
          {buttons({invalid, submitting, pristine})}
        </Box>
      </form>
    </Card>
  )
}

export default reduxForm({
  form: "shipping",
  validate,
  enableReinitialize: true
})(Shipping)
