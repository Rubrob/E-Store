import React, { useState } from 'react'
import './Billing.sass'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { FormControlLabel, Checkbox, Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { validate } from '../../../validation/checkout'
import { submitCheckout } from '../../../actions/cart'
import PaymentFields from './PaymentFields/PaymentFields'
import FormsPreview from './../FormsPreview/FormsPreview'
import CheckoutForm from './../CheckoutForm/CheckoutForm'
import { notify } from '../../../components/Toaster/Toaster'

const SubmitButton = withStyles(() => ({
  root: {
    alignSelf: 'flex-end',
    marginTop: 20,
    padding: '15px 20px',
    color: '#fff',
  }
}))(Button)

function Billing(props) {
  const { handleSubmit, invalid, submitting, pristine } = props
  const { submitCheckout } = props
  const { shipping, step, cartProducts, delivery } = props
  const { firstname, lastname, address, city, zip, country } = shipping
  const previewContent = { firstname, lastname, address, city, zip, country }

  const submit = async (value) => {
    const onSuccess = (message) => {
      window.scrollTo(0, 0)
      notify('success', message)
    }
    const onFail = (message) => notify('error', message)

    const data = {
      shipping,
      billing: value,
      products: cartProducts,
      delivery,
      bas: checked
    }

    await submitCheckout(data, { onSuccess, onFail })
  }

  const [checked, setChecked] = useState(true)

  return (
    <div className='billing'>
      <div className='shipping-title'>
        <Typography variant='h6' component='h4' children='PAYMENT' />
      </div>
      {step >= 2 && <form onSubmit={handleSubmit(submit)}>
          <PaymentFields />

          <FormControlLabel
            className='billingAddressCheckbox'
            control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
            label='Billing address same as shipping'
            />

          {checked ?
            <FormsPreview title='Shipping Address' content={previewContent} cn='billingAddress' />
            : <CheckoutForm type='billing'/>}

          <SubmitButton
            variant='contained'
            color='secondary'
            type='submit'
            disabled={invalid || submitting || pristine}
            children={'PLACE ORDER'}
            />
        </form>}
    </div>
  )
}

const mapStateToProps = state => ({
  initialValues: state.auth.addresses.billing,
  shipping: state.cart.checkout.addresses.shipping,
  cartProducts: state.cart.cartProducts,
  delivery: state.cart.defaultValues.delivery,
  step: state.cart.step,
  fields: state.form.billing,
})
const mapDispatchToProps = dispatch => ({
  submitCheckout: (shipping, billing) => dispatch(submitCheckout(shipping, billing)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'billing',
    validate,
    enableReinitialize: true
  })
)(Billing)