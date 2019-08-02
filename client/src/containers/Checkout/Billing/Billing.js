import React, { useState, createRef } from 'react'
import './Billing.sass'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { submitCheckout, emptyCart } from '../../../reducers/actions/cart'
import { validate } from '../../../validation/checkout'
import { FormControlLabel, Checkbox, ButtonBase } from '@material-ui/core'
import PaymentFields from './PaymentFields/PaymentFields'
import FormsPreview from './../FormsPreview/FormsPreview'
import CheckoutForm from './../CheckoutForm/CheckoutForm'
import Toaster, { notify } from '../../../components/Toaster/Toaster'


function Billing(props) {
  const { handleSubmit, valid } = props
  const { submitCheckout, emptyCart } = props
  const { shipping, step, cartProducts, delivery } = props
  const { firstname, lastname, address, city, zip, country } = shipping

  const previewContent = { firstname, lastname, address, city, zip, country }
  const submitBtn = createRef()

  const submit = async (value) => {
    submitBtn.current.disabled = true

    const onSuccess = (message) => {
      setTimeout(() => {
        emptyCart()
        window.scrollTo(0, 0)
      }, 3000)
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
      <Toaster />
      <header>PAYMENT</header>
      {step >= 2 && <form onSubmit={handleSubmit(submit)}>
          <PaymentFields />

          <FormControlLabel
            className='bas'
            control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
            label='Billing address same as shipping'
            />

          {checked ?
            <FormsPreview title='Shipping Address' content={previewContent} cn='billingAddress' />
            : <CheckoutForm type='billing'/>}

          <ButtonBase
            buttonRef={submitBtn}
            type='submit'
            className='submit'
            disabled={!valid}
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
})
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