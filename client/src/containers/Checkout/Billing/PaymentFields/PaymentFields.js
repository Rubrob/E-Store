import React from 'react'
import { Field } from 'redux-form'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { createTextMask } from 'redux-form-input-masks'
import CustomTextField from './../../CustomTextField/CustomTextField'

const cardMask = createTextMask({ pattern: '9999 9999 9999 9999' })
const expMask = createTextMask({ pattern: '99/99' })

const useStyles = makeStyles(() => ({
  paymentFields: {
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateAreas: `'cardnumber exp cvv'`,
    '& .textField': {
      '&.cardnumber': {
        gridArea: 'cardnumber'
      },
      '&.exp': {
        gridArea: 'exp'
      },
      '&.cvv': {
        gridArea: 'cvv'
      }
    },
   '@media (max-width: 600px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gridTemplateAreas: `"cardnumber" "exp" "cvv"`
   },
  },
  title: {
    fontWeight: 600
  }
}))

function PaymentFields(props) {
  const classes = useStyles()
  return (
    <>
      <Typography variant='subtitle1' className={classes.title} paragraph children={'Add Card'} />
      <div className={classes.paymentFields}>
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