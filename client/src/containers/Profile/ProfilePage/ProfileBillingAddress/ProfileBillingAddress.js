import React, { useState } from 'react'
import './ProfileBillingAddress.sass'
import { reduxForm } from 'redux-form'
import { validate } from '../../../../validation/checkout'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Typography } from '@material-ui/core'
import { setBillingAddress } from '../../../../actions/auth'
import FormsPreview from './../../../Checkout/FormsPreview/FormsPreview'
import CheckoutForm from './../../../Checkout/CheckoutForm/CheckoutForm'
import { isObjectValues } from '../../../../utils'

const ProfileBillingAddress = (props) => {
  const {
    handleSubmit,
    invalid,
    setBilling,
    billing,
  } = props
  const { firstname, lastname, address, city, zip, country } = billing
  const [open, setOpen] = useState(false)
  const isValues = isObjectValues(billing)
  const preview = isValues && <FormsPreview content={{ firstname, lastname, address, city, zip, country }} />
  const label = isValues ? 'Edit' : 'Add'

  const openForm = () => setOpen(true)
  const closeForm = () => setOpen(false)

  const submit = async (value) => {
    await setBilling(value)
    closeForm()
  }

  return (
    <div className={`profileBillingAddress ${isValues ? '' : (!open && 'toAdd')}`}>
      <Typography variant='h6' className='profileBillingAddress-header' children='Billing Address' />
      <div className='profileBillingAddress-preview'>
        {open ? <form onSubmit={handleSubmit(submit)}>
          <CheckoutForm type='billing' />
          <div className='formBtns'>
            <Button
              variant='contained'
              onClick={closeForm}
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
  initialValues: state.auth.addresses.billing,
  billing: state.auth.addresses.billing
})
const mapDispatchToProps = dispatch => ({
  setBilling: value => dispatch(setBillingAddress(value))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'profile-billing',
    validate,
    enableReinitialize: true
  })
)(ProfileBillingAddress)