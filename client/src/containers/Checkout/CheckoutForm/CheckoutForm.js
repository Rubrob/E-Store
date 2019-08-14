import React from 'react'
import './CheckoutForm.sass'
import { Field } from 'redux-form'
import { createTextMask } from 'redux-form-input-masks'
import CustomTextField from './../CustomTextField/CustomTextField'
import { required } from './../../../validation/checkout'

const phoneMask = createTextMask({ pattern: '9 (99) 999 99 99' })

function CheckoutForm(props) {

  const { type } = props

  return (
    <div className='CheckoutForm'>
    {type === 'shipping' ?
      <div className='shippingForm'>
        <Field name='firstname' label='First Name' component={CustomTextField} />
        <Field name='lastname' label='Last Name' component={CustomTextField}  />
        <Field name='address' label='Address' component={CustomTextField} />
        <Field name='country' label='Country' component={CustomTextField} />
        <Field name='city' label='City' component={CustomTextField} />
        <Field name='zip' label='Postal Code' inputProps={{ maxLength: 12 }} type='tel' component={CustomTextField} />
        <Field name='email' label='Email' type='email' component={CustomTextField} />
        <Field name='phone' label='Phone' inputProps={{ maxLength: 30 }} type='tel' component={CustomTextField} {...phoneMask}/>
      </div> : null}
      {type === 'billing' ?
      <div className='billingForm'>
        <Field
          name='firstname'
          label='First Name'
          variant='outlined'
          component={CustomTextField}
          validate={[required]} />
        <Field
          name='lastname'
          label='Last Name'
          component={CustomTextField}
          validate={[required]} />
        <Field
          name='address'
          label='Address'
          component={CustomTextField}
          validate={[required]} />
        <Field
          name='country'
          label='Country'
          component={CustomTextField}
          validate={[required]} />
        <Field
          name='city'
          label='City'
          component={CustomTextField}
          validate={[required]} />
        <Field
          name='zip'
          label='Postal Code'
          inputProps={{ maxLength: 12 }}
          type='tel'
          component={CustomTextField}
          validate={[required]} />
      </div> : null}
    </div>
    )
  }

export default CheckoutForm