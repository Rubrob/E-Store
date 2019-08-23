import React, { useState } from 'react'
import './ProfileShippingAddress.sass'
import { reduxForm } from 'redux-form'
import { validate } from '../../../../validation/checkout'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { setShippingAddress } from '../../../../actions/auth'
import { Button, Typography } from '@material-ui/core'
import FormsPreview from './../../../Checkout/FormsPreview/FormsPreview'
import CheckoutForm from './../../../Checkout/CheckoutForm/CheckoutForm'

function ProfileShippingAddress(props) {
  const { handleSubmit, invalid } = props
  const { setShipping, shipping } = props
  const { firstname, lastname, address, city, zip, country, email, phone } = shipping

  const [open, setOpen] = useState(false)

  let isValues = false
  for(let key in shipping){
    if(!shipping[key].length){
      isValues = false
    }else{
      isValues = true
    }
  }

  const preview = isValues && <FormsPreview content={{ firstname, lastname, address, city, zip, country, email, phone }} />
  const label = isValues ? 'Edit' : 'Add'

  const submit = async (value) => {
    await setShipping(value)
    setOpen(false)
  }

  return (
    <div className={`profileShippingAddress ${isValues ? '' : (!open &&'toAdd')}`}>
      <Typography variant='h6' className='profileShippingAddress-header' children={'Shipping Address'} />
      <div className='profileShippingAddress-preview'>
        {open ? <form onSubmit={handleSubmit(submit)}>
          <CheckoutForm type='shipping' />
          <div className='formBtns'>
            <Button
              variant='contained'
              onClick={() => setOpen(false)}
              children='Cancel' />
            <Button
              variant='contained'
              color='secondary'
              type='submit'
              disabled={invalid}
              children='Save' />
          </div>
        </form> : preview}
        {!open && <Button variant='contained' className='expandForm' onClick={() => setOpen(true)} children={label} />}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  initialValues: state.auth.addresses.shipping,
  shipping: state.auth.addresses.shipping
})
const mapDispatchToProps = dispatch => ({
  setShipping: value => dispatch(setShippingAddress(value))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'profile-shipping',
    validate,
    enableReinitialize: true
  })
)(ProfileShippingAddress)