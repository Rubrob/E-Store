import React from 'react'
import './PaymentFields.sass'
import { Field } from 'redux-form'
import { Typography } from '@material-ui/core'
import { createTextMask } from 'redux-form-input-masks'
import CustomTextField from './../../CustomTextField/CustomTextField'

const cardMask = createTextMask({ pattern: '9999 9999 9999 9999' })
const expMask = createTextMask({ pattern: '99/99' })

function PaymentFields() {
  return (
    <>
      <Typography variant='subtitle1' className='paymentFields-title' paragraph children={'Add Card'} />
      <div className='paymentFields'>
        <Field
          name='cardnumber'
          type='tel'
          label='Card Number'
          component={CustomTextField}
          className='cardnumber'
          {...cardMask}
          />

        <Field
          name='exp'
          type='tel'
          label='MM/YY'
          component={CustomTextField}
          className='exp'
          {...expMask}
          />

        <Field
          name='cvv'
          type='tel'
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