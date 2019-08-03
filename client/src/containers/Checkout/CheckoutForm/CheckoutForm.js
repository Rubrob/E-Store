import React from 'react'
import './CheckoutForm.sass'
import { Field } from 'redux-form'
import { createTextMask } from 'redux-form-input-masks'
import CustomTextField from './../CustomTextField/CustomTextField'

const phoneMask = createTextMask({ pattern: '9 (99) 999 99 99' })

function CheckoutForm(props) {

  const { type } = props

  return (
    <div className='CheckoutForm'>
    {type === 'shipping' ?
      <div className='shippingForm'>
        <Field name='firstname' label='First Name' variant='outlined' component={CustomTextField} />
        <Field name='lastname' label='Last Name' variant='outlined' component={CustomTextField}  />
        <Field name='address' label='Address' variant='outlined' component={CustomTextField} />
        <Field name='country' label='Country' variant='outlined' component={CustomTextField} />
        <Field name='city' label='City' variant='outlined' component={CustomTextField} />
        <Field name='zip' label='Postal Code' variant='outlined' inputProps={{ maxLength: 12 }} type='tel' component={CustomTextField} />
        <Field name='email' label='Email' variant='outlined' type='email' component={CustomTextField} />
        <Field name='phone' label='Phone' variant='outlined' inputProps={{ maxLength: 30 }} type='tel' component={CustomTextField} {...phoneMask}/>
      </div> : null}
      {type === 'billing' ?
      <div className='billingForm'>
        <Field name='firstname' label='First Name' variant='outlined' component={CustomTextField} />
        <Field name='lastname' label='Last Name' variant='outlined' component={CustomTextField}  />
        <Field name='address' label='Address' variant='outlined' component={CustomTextField} />
        <Field name='country' label='Country' variant='outlined' component={CustomTextField} />
        <Field name='city' label='City' variant='outlined' component={CustomTextField} />
        <Field name='zip' label='Postal Code' variant='outlined' inputProps={{ maxLength: 12 }} type='tel' component={CustomTextField} />
      </div> : null}
    </div>
    )
  }

export default CheckoutForm