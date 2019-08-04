import React, { useState } from 'react'
import { Select, MenuItem, InputBase } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const CustomInput = withStyles(() => ({
  root: {
    paddingRight: 0,
    paddingLeft: 4
  },
  input: {
    fontSize: 14,
    padding: '0 20px 0 0px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}))(InputBase);


function CustomSelect({data, primary, onChangeData, onChange = () => null}) {

  const [select, setSelect] = useState(primary)
  const handleSelect = (evt) => {
    setSelect(evt.target.value)
    onChange({...onChangeData, data: evt.target.value})
  }

  return (
    <Select
      value={select}
      name="selectname"
      input={<CustomInput />}
      onChange={handleSelect}
      className='CustomSelect'
      >
      {data.map(item => <MenuItem key={item} value={item} children={item} />)}
    </Select>
  )
}

export default CustomSelect