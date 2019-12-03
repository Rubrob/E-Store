import React from "react"
import "./Shipping.sass"
import { reduxForm } from "redux-form"
import { connect } from "react-redux"
import { compose } from "redux"
import {Button, Typography, Box, Card} from "@material-ui/core"
import { Lock } from "@material-ui/icons"
import DeliveryBox from "./DeliveryBox/DeliveryBox"
import FormsPreview from "../FormsPreview/FormsPreview"
import CheckoutForm from "./../CheckoutForm/CheckoutForm"
import { validate } from "../../../validation/checkout"
import { freeIfZero } from "../../../utils"
import { submitShipping, prevStep } from "../../../actions/cart"


const Shipping = ({
  handleSubmit,
  invalid,
  step,
  prevStep,
  submitShipping,
  delivery,
  currency,
  shipping,
  deliveryMethods,
}) => {
  const {firstname, lastname, ...rest} = shipping
  const previewContent = {fullname: `${firstname} ${lastname}`, ...rest}

  const submit = (data) => submitShipping(data)

  const delChild = (
    <div className="delChild">
      <Typography gutterBottom className="delChild-title" children="Shipping Speed" />
      <Typography variant="body2" color='textSecondary' className="delChild-content">
        {delivery}: {freeIfZero(deliveryMethods[delivery], currency)}
      </Typography>
    </div>
  )

  return (
    <Card className="shipping">
      <div className="shipping-title">
        <Typography variant="h5" component="h4" children="SHIPPING" />
      </div>
      {step >= 2 ?
        <div className="shipping-preview">
          <FormsPreview title="Shipping Address" content={previewContent} children={delChild} />
          <div className="prev" onClick={prevStep}>Edit</div>
        </div> :
        <form onSubmit={handleSubmit(submit)}>
          <CheckoutForm type="shipping" />

          <Typography variant="caption" className="shippingNote">
            <Lock fontSize="inherit" />
            <span>
              Your privacy is important to us. We will only contact you if there is an issue with your order.
            </span>
          </Typography>

          <DeliveryBox />

          <Box alignSelf="flex-end" mt={3}>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              type="submit"
              disabled={invalid}
              children="SAVE & CONTINUE"
            />
          </Box>
        </form>}
    </Card>
  )
}

const mapStateToProps = state => ({
  initialValues: state.auth.addresses.shipping,
  step: state.cart.step,
  delivery: state.cart.defaultValues.delivery,
  currency: state.products.currency,
  shipping: state.cart.checkout.addresses.shipping,
  deliveryMethods: state.cart.deliveryMethods
})
const mapDispatchToProps = dispatch => ({
  prevStep: () => dispatch(prevStep()),
  submitShipping: value => dispatch(submitShipping(value))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "shipping",
    validate,
    enableReinitialize: true
  })
)(Shipping)