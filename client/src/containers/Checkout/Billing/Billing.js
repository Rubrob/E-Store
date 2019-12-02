import React, { useState } from "react"
import "./Billing.sass"
import { compose } from "redux"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { FormControlLabel, Checkbox, Button, Typography, Box, Card } from "@material-ui/core"
import { validate } from "../../../validation/checkout"
import { submitCheckout } from "../../../actions/cart"
import PaymentFields from "./PaymentFields/PaymentFields"
import FormsPreview from "./../FormsPreview/FormsPreview"
import CheckoutForm from "./../CheckoutForm/CheckoutForm"
import { notify } from "../../../components/Toaster/Toaster"


const Billing = ({
  handleSubmit,
  invalid,
  submitting,
  pristine,
  submitCheckout,
  shipping,
  step,
 }) => {
  const { firstname, lastname, address, city, zip, country } = shipping
  const previewContent = { fullname: `${firstname} ${lastname}`, address, city, zip, country }

  const submit = async ({cardnumber, exp, cvv, ...rest}) => {
    const data = {
      addresses: {
        shipping,
        billing: {
          card: {
            cardnumber,
            exp,
            cvv,
          },
          address: {...rest}
        },
      },
      bas: checked
    }

    await submitCheckout(data, (type, msg) => notify(type, msg))
  }

  const [checked, setChecked] = useState(true)

  return (
    <Card className="billing">
      <div className="billing-title">
        <Typography variant="h5" component="h4" children="PAYMENT" />
      </div>
      {step >= 2 && <form onSubmit={handleSubmit(submit)}>
          <PaymentFields />

          <FormControlLabel
            className="billingAddressCheckbox"
            control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
            label="Billing address same as shipping"
          />

          {checked ?
            <FormsPreview title="Shipping Address" content={previewContent} cn="billingAddress" /> :
            <CheckoutForm type="billing"/>
          }

          <Box alignSelf="flex-end" mt={3}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              type="submit"
              disabled={invalid || submitting || pristine}
              children={"PLACE ORDER"}
            />
          </Box>
        </form>}
    </Card>
  )
}

const mapStateToProps = state => ({
  initialValues: state.auth.addresses.billing,
  shipping: state.cart.checkout.addresses.shipping,
  step: state.cart.step,
  fields: state.form.billing,
})
const mapDispatchToProps = dispatch => ({
  submitCheckout: (shipping, billing) => dispatch(submitCheckout(shipping, billing)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "billing",
    validate,
    enableReinitialize: true
  })
)(Billing)