import React, {useState} from "react";
import Shipping from "containers/Checkout/Shipping";
import Billing from "containers/Checkout/Billing";
import {freeIfZero, capitalize} from "utils";
import {
  Button,
  Box,
  StepLabel,
  Step,
  Stepper
} from "@material-ui/core";
import CheckoutPreview from "containers/Checkout/CheckoutPreview";
import {useSnackbar} from "notistack";


export default (props) => {
  const [step, setStep] = useState(0);
  const steps = ["Shipping", "Billing", "Place Order"];
  const handleNext = () => setStep(prevStep => prevStep + 1);
  const handleBack = () => setStep(prevStep => prevStep - 1);
  const {enqueueSnackbar} = useSnackbar();
  const submitCheckout = async (evt) => {
    evt.preventDefault()
    const checkoutData = {
      addresses: {
        shipping: props.shippingPreview,
        billing: props.billingPreview,
      }
    }
    await props.onCheckout(checkoutData, (variant, msg) => enqueueSnackbar(msg, {variant}))
  }

  const renderSteppers = () => (
    steps.map(label => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))
  )

  const renderButtons = (condition) => {
    return (
      <>
        <Button
          disabled={step === 0}
          onClick={handleBack}
          style={{marginRight: 8}}
        >
          Back
        </Button>
        <Button
          disabled={condition}
          size="large"
          variant="contained"
          color="primary"
          type="submit"
        >
          {step === steps.length - 1 ? "Place Order" : "Next"}
        </Button>
      </>
    )
  }

  return (
    <Box width={1}>
      <Stepper activeStep={step} alternativeLabel>
        {renderSteppers()}
      </Stepper>
      <div>
        {step === 0 ? (
          <Shipping
            currency={props.currency}
            initialValues={props.initialValuesShipping}
            onSubmit={(data) => {
              props.submitShipping(data)
              handleNext()
            }}
            delivery={props.delivery}
            deliveryMethods={props.deliveryMethods}
            changeDelivery={props.changeDelivery}
            buttons={(props) => renderButtons(props.invalid || props.submitting)}
          />
        ) : step === 1 ? (
            <Billing
              initialValues={props.initialValuesBilling}
              onSubmit={(data) => {
                props.sumbitBilling(data)
                handleNext()
              }}
              shipping={props.shippingPreview}
              buttons={(props) => renderButtons(props.invalid || props.submitting || props.pristine)}
            />
        ) : step === 2 ? (
          <CheckoutPreview
            shippingPreview={props.shippingPreview}
            billingPreview={props.billingPreview}
            deliveryPreview={{speed: `${capitalize(props.delivery)}: ${freeIfZero(props.deliveryMethods[props.delivery], props.currency)}`}}
            onSumbit={submitCheckout}
            buttons={() => renderButtons(false)}
          />
        ) : null}
      </div>
    </Box>
  );
}
