import React from 'react'
import { reduxForm } from 'redux-form'
import { validate } from '../../../../validation/checkout'
import ProfileForm from '../ProfileForm/ProfileForm'


export default reduxForm({
  form: 'profile-billing',
  validate,
  enableReinitialize: true
})((props) => (<ProfileForm {...props} />))
