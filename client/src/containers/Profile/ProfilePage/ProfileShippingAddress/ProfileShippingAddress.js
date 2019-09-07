import React, { useState } from 'react'
import './ProfileShippingAddress.sass'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Typography } from '@material-ui/core'
import { validate } from '../../../../validation/checkout'
import { setShippingAddress } from '../../../../actions/auth'
import FormsPreview from './../../../Checkout/FormsPreview/FormsPreview'
import CheckoutForm from './../../../Checkout/CheckoutForm/CheckoutForm'
import { isObjectValues } from '../../../../utils'

function ProfileShippingAddress(props) {
  const {
    handleSubmit,
    invalid,
    setShipping,
    shipping,
  } = props
  const { firstname, lastname, address, city, zip, country, email, phone } = shipping
  const [open, setOpen] = useState(false)
  const isValues = isObjectValues(shipping)
  const preview = isValues && <FormsPreview content={{ firstname, lastname, address, city, zip, country, email, phone }} />
  const label = isValues ? 'Edit' : 'Add'

  const openForm = () => setOpen(true)
  const closeFrom = () => setOpen(false)

  const submit = async (value) => {
    await setShipping(value)
    closeFrom()
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
              onClick={closeFrom}
              children='Cancel' />
            <Button
              variant='contained'
              color='secondary'
              type='submit'
              disabled={invalid}
              children='Save' />
          </div>
        </form> : preview}
        {!open && <Button variant='contained' className='openForm' onClick={openForm} children={label} />}
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