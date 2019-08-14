import React, { useState } from 'react'
import './Billing.sass'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { FormControlLabel, Checkbox, Button, Typography } from '@material-ui/core'
import { validate } from '../../../validation/checkout'
import { submitCheckout, emptyCart } from '../../../reducers/actions/cart'
import PaymentFields from './PaymentFields/PaymentFields'
import FormsPreview from './../FormsPreview/FormsPreview'
import CheckoutForm from './../CheckoutForm/CheckoutForm'
import { notify } from '../../../components/Toaster/Toaster'


function Billing(props) {
  const { handleSubmit, invalid, submitting, pristine } = props
  const { submitCheckout, emptyCart } = props
  const { shipping, step, cartProducts, delivery } = props
  const { firstname, lastname, address, city, zip, country } = shipping
  const previewContent = { firstname, lastname, address, city, zip, country }

  const submit = async (value) => {
    const onSuccess = (message) => {
      window.scrollTo(0, 0)
      emptyCart()
      notify('success', message)
    }
    const onFail = (message) => {
      notify('error', message)
    }

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
            style={{marginBottom: 20, marginTop: 40}}
            control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
            label='Billing address same as shipping'
            />

          {checked ?
            <FormsPreview title='Shipping Address' content={previewContent} cn='billingAddress' />
            : <CheckoutForm type='billing'/>}

          <Button
            variant='contained'
            color='secondary'
            type='submit'
            className='submit'
            disabled={invalid || submitting || pristine}
            children={'PLACE ORDER'}
            />
        </form>}
    </div>
  )
}

const selector = formValueSelector('billing')
const mapStateToProps = state => {
  const firstname = selector(state, 'firstname')
  return {
    initialValues: state.auth.addresses.billing,
    shipping: state.cart.checkout.addresses.shipping,
    cartProducts: state.cart.cartProducts,
    delivery: state.cart.defaultValues.delivery,
    step: state.cart.step,
    fields: state.form.billing,
    firstname
  }
}
const mapDispatchToProps = dispatch => ({
  submitCheckout: (shipping, billing) => dispatch(submitCheckout(shipping, billing)),
  emptyCart: () => dispatch(emptyCart())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'billing',
    validate,
    enableReinitialize: true
  })
)(Billing)