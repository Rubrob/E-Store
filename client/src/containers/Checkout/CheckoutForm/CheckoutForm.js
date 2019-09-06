import React from 'react'
import { Field } from 'redux-form'
import { createTextMask } from 'redux-form-input-masks'
import CustomTextField from './../CustomTextField/CustomTextField'
import { required } from './../../../validation/checkout'
import { Grid } from '@material-ui/core'

const phoneMask = createTextMask({ pattern: '9 (99) 999 99 99' })

const CheckoutForm = ({ type }) => (
  <>
  {type === 'shipping' ?
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Field name='firstname' label='First Name' component={CustomTextField} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field name='lastname' label='Last Name' component={CustomTextField}  />
      </Grid>
      <Grid item xs={12}>
        <Field name='address' label='Address' component={CustomTextField} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Field name='country' label='Country' component={CustomTextField} />
      </Grid>
      <Grid item xs={6} sm={4}>
        <Field name='city' label='City' component={CustomTextField} />
      </Grid>
      <Grid item xs={6} sm={4}>
        <Field name='zip' label='Postal Code' inputProps={{ maxLength: 12 }} type='tel' component={CustomTextField} />
      </Grid>
      <Grid item xs={12}>
        <Field name='email' label='Email' type='email' component={CustomTextField} />
      </Grid>
      <Grid item xs={12}>
        <Field name='phone' label='Phone' inputProps={{ maxLength: 30 }} type='tel' component={CustomTextField} {...phoneMask}/>
      </Grid>
    </Grid> : null}
    {type === 'billing' ?
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Field
            name='firstname'
            label='First Name'
            variant='outlined'
            component={CustomTextField}
            validate={[required]} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name='lastname'
            label='Last Name'
            component={CustomTextField}
            validate={[required]} />
        </Grid>
        <Grid item xs={12}>
          <Field
            name='address'
            label='Address'
            component={CustomTextField}
            validate={[required]} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name='country'
            label='Country'
            component={CustomTextField}
            validate={[required]} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Field
            name='city'
            label='City'
            component={CustomTextField}
            validate={[required]} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Field
            name='zip'
            label='Postal Code'
            inputProps={{ maxLength: 12 }}
            type='tel'
            component={CustomTextField}
            validate={[required]} />
        </Grid>
      </Grid> : null}
  </>
)

export default CheckoutForm