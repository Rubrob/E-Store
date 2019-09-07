import React from 'react'
import { Field } from 'redux-form'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { createTextMask } from 'redux-form-input-masks'
import CustomTextField from './../../CustomTextField/CustomTextField'

const cardMask = createTextMask({ pattern: '9999 9999 9999 9999' })
const expMask = createTextMask({ pattern: '99/99' })

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600
  }
}))

const PaymentFields = (props) => {
  const classes = useStyles()
  return (
    <>
      <Typography variant='subtitle1' className={classes.title} paragraph children={'Add Card'} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Field
            name='cardnumber'
            type='tel'
            label='Card Number'
            component={CustomTextField}
            className='cardnumber'
            {...cardMask}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Field
              name='exp'
              type='tel'
              label='MM/YY'
              component={CustomTextField}
              className='exp'
              {...expMask}
              />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Field
                name='cvv'
                type='tel'
                label='Secure Code'
                component={CustomTextField}
                className='cvv'
                inputProps={{ maxLength: 4 }}
                />
            </Grid>
      </Grid>
    </>
  )
}

export default PaymentFields