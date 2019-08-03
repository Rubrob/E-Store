import React, { useState } from 'react'
import './ProfileBillingAddress.sass'
import { reduxForm } from 'redux-form'
import { validate } from '../../../../validation/checkout'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { ButtonBase } from '@material-ui/core'
import { setBillingAddress } from '../../../../reducers/actions/auth'
import FormsPreview from './../../../Checkout/FormsPreview/FormsPreview'
import CheckoutForm from './../../../Checkout/CheckoutForm/CheckoutForm'

function ProfileBillingAddress(props) {
  const { handleSubmit, valid } = props
  const { setBilling, billing } = props
  const { firstname, lastname, address, city, zip, country } = billing

  const [expand, setExpand] = useState(false)

  let isValues = false
  for(let key in billing){
    if(!billing[key].length){
      isValues = false
    }else{
      isValues = true
    }
  }

  const preview = isValues && <FormsPreview content={{ firstname, lastname, address, city, zip, country }} cn='pBillingPreview' />

  const label = isValues ? 'Edit' : 'Add'

  const submit = async (value) => {
    await setBilling(value)
    setExpand(false)
  }

  return (
    <div className={`profileBillingAddress ${isValues ? '' : (!expand && 'toAdd')}`}>
      <div className='profileBillingAddress-header'>Billing Address</div>
      <div className='profileBillingAddress-preview'>
        {expand ? <form onSubmit={handleSubmit(submit)}>
          <CheckoutForm type='billing' />
          <div className='formBtns'>
            <ButtonBase onClick={() => setExpand(false)} children={'Cancel'} />
            <ButtonBase type='submit' disabled={!valid} children={'Save'} />
          </div>
        </form> : preview}
        {!expand && <ButtonBase className='expandForm' onClick={() => setExpand(true)} children={label} />}
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