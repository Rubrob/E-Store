import React from 'react'
import { TextField } from '@material-ui/core'

const CustomTextField = ({ input, label, helperText, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    fullWidth
    className={`textField ${input.name}`}
    variant='outlined'
    label={label}
    {...input}
    {...custom}
    helperText={error && touched ? error : null}
    error={touched && invalid} />
)

export default CustomTextField