import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const CSSField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      fontSize: 14
    },
    '& label.Mui-focused': {
      color: '#999',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#999',
    },
    '& .Mui-error::after': {
      borderBottomColor: '#f44336'
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
        label={label}
        {...input}
        {...custom}
        error={touched && invalid} />
      {error && touched && <span style={styles.error}>{error}</span>}
    </div>
  );
}

export default CustomTextField