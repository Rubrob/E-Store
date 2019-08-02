import React from 'react'
import './Shipping.sass'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { validate } from '../../../validation/checkout'
import { freeIfZero } from '../../../utils'
import { Lock } from '@material-ui/icons'
import { ButtonBase } from '@material-ui/core'
import DeliveryBox from './DeliveryBox/DeliveryBox'
import FormsPreview from '../FormsPreview/FormsPreview'
import CheckoutForm from './../CheckoutForm/CheckoutForm'
import { submitShipping, prevStep } from '../../../reducers/actions/cart'

function Shipping (props) {

  const { handleSubmit, valid } = props
  const { step, prevStep, submitShipping, delivery, currency, shipping, deliveryMethods } = props
  const { firstname, lastname, address, city, zip, country, email, phone } = shipping

  const previewContent = { firstname, lastname, address, city, zip, country, email, phone }

  const submit = (data) => {
    submitShipping(data)
  }

  const delChild = <div className='delChild'>
    <h4 className='delChild-title'>Shipping Speed</h4>
    <div className='delChild-content'>
      {delivery}: {freeIfZero(deliveryMethods[delivery], currency)}
    </div>
  </div>

  return (
    <div className='shipping'>
      <header>SHIPPING</header>
      {step >= 2 ? <div className='shipping-preview'>
          <FormsPreview title='Shipping Address' content={previewContent} children={delChild} />
          <div className='prev' onClick={prevStep}>Edit</div>
        </div> :
        <form onSubmit={handleSubmit(submit)}>
          <CheckoutForm type='shipping' />

          <div className='shippingNote'>
            <Lock />
            Your privacy is important to us. We will only contact you if there is an issue with your order.
          </div>

          <DeliveryBox />

          <ButtonBase
            type='submit'
            className='submit'
            disabled={!valid}
            children={'SAVE & CONTINUE'}
            />
        </form>}
    </div>
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
    form: 'shipping',
    validate,
    enableReinitialize: true
  })
)(Shipping)