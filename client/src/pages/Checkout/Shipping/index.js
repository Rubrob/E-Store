import React from "react";
import "./styles.sass";
import { reduxForm } from "redux-form";
import { Typography, Box, Card } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import DeliveryBox from "./DeliveryBox";
import { validate } from "validation";
import ShippingFields from "components/Fields/ShippingFields";

const Shipping = ({
  handleSubmit,
  invalid,
  submitting,
  pristine,
  onSubmit,
  selectedDelivery,
  currency,
  deliveryMethods,
  setDeliveryMethod,
  buttons
}) => {
  return (
    <Card className="shipping">
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <ShippingFields />
        <Typography className="shippingNote" variant="caption">
          <Lock fontSize="inherit" />
          Your privacy is important to us. We will only contact you if there is an issue
          with your order.
        </Typography>
        <DeliveryBox
          onChange={setDeliveryMethod}
          methods={deliveryMethods}
          selected={selectedDelivery}
          currency={currency}
        />
        <Box display="flex" justifyContent="flex-end" mt={3} width={1}>
          {buttons({ invalid, submitting, pristine })}
        </Box>
      </form>
    </Card>
  );
};

export default reduxForm({
  form: "shipping",
  validate,
  enableReinitialize: true
})(Shipping);
