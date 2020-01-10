import React from "react";
import "./styles.sass";
import {Box, Card} from "@material-ui/core";
import FormsPreview from "containers/Checkout/FormsPreview";


const CheckoutPreview = (props) => {
  return (
    <Box width={1}>
      <Card className="CheckoutPreview">
        <form onSubmit={props.onSumbit}>
          <FormsPreview
            title="Shipping Address"
            content={props.shippingPreview}
          />
          <FormsPreview
            title="Billing Address"
            content={props.billingPreview.address}
          />
          <FormsPreview
            title="Delivery Speed"
            content={props.deliveryPreview}
          />
          <Box display="flex" justifyContent="flex-end" mt={3}>
            {props.buttons(props)}
          </Box>
        </form>
      </Card>
    </Box>
  );
}

export default CheckoutPreview
