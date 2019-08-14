import React from 'react'
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const CSSField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      fontSize: 14
    },
    '& label.Mui-focused': {
      color: '#999',
    },
    '& label.Mui-focused.Mui-error': {
      color: '#f44336'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#999',
    },
    '& .Mui-error': {
      '&::after':{
        borderBottomColor: '#f44336'
      },
    },
    '& .Mui-error.Mui-focused fieldset': {
      borderColor: '#f44336 !important'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e5e5e5',
      },
      '&:hover fieldset': {
        borderColor: '#999',
        color: '#e5e5e5'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#999',
      },
    },
  },
})(TextField);

const styles = {
  error: {
    marginTop: 5,
    fontSize: 14,
    color: '#f44336'
  }
}

function CustomTextField ({ input, label, meta: { touched, invalid, error }, ...custom }) {
  return (
    <div className={`textField ${input.name}`}>
      <CSSField
        fullWidth
        variant='outlined'
        label={label}
        {...input}
        {...custom}
        error={touched && invalid} />
      {error && touched && <span style={styles.error}>{error}</span>}
    </div>
  );
}

export default CustomTextField