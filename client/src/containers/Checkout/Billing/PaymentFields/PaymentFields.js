import React from 'react'
import { Field } from 'redux-form'
import './PaymentFields.sass'
import { createTextMask } from 'redux-form-input-masks'
import CustomTextField from './../../CustomTextField/CustomTextField'

const cardMask = createTextMask({ pattern: '9999 9999 9999 9999' })
const expMask = createTextMask({ pattern: '99/99' })

function PaymentFields() {
  return (
    <>
      <h4>Add Card</h4>
      <div className='paymentFields'>
        <Field
          name='cardnumber'
          type='tel'
          variant='outlined'
          label='Card Number'
          component={CustomTextField}
          className='cardnumber'
          {...cardMask}
          />

        <Field
          name='exp'
          type='tel'
          variant='outlined'
          label='MM/YY'
          component={CustomTextField}
          className='exp'
          {...expMask}
          />

        <Field
          name='cvv'
          type='tel'
          variant='outlined'
          label='Secure Code'
          component={CustomTextField}
          className='cvv'
          inputProps={{ maxLength: 4 }}
          />
      </div>
    </>
  )
}

export default PaymentFields