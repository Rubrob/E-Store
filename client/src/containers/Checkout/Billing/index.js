import React, {useState} from "react";
import "./styles.sass";
import {reduxForm} from "redux-form";
import {
  FormControlLabel,
  Checkbox,
  Box,
  Card
} from "@material-ui/core";
import { validate } from "validation";
import PaymentFields from "./PaymentFields";
import CheckoutForm from "../CheckoutForm";


const Billing = ({
  handleSubmit,
  invalid,
  submitting,
  pristine,
  onSubmit,
  shipping,
  buttons
 }) => {
  const [checked, setChecked] = useState(true)
  const submit = async ({cardnumber, exp, cvv, ...rest}) => {
    const {phone, email, ...shippingRest} = shipping
    const data = {
      card: {
        cardnumber,
        exp,
        cvv,
      },
      address: checked ? {...shippingRest} : {...rest}
    }
    onSubmit(data)
  }

  return (
    <Card className="billing">
      <form onSubmit={handleSubmit(submit)}>
        <PaymentFields />
        <FormControlLabel
          className="billingAddressCheckbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          control={<Checkbox />}
          label="Billing address same as shipping"
        />
        {!checked && (
          <CheckoutForm type="billing" />
        )}
        <Box display='flex' justifyContent="flex-end" mt={3} width={1}>
          {buttons({invalid, submitting, pristine})}
        </Box>
      </form>
    </Card>
  )
}

export default reduxForm({
  form: "billing",
  validate,
  enableReinitialize: true
})(Billing)
