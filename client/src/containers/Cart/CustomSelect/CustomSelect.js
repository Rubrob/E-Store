import React, { useState } from 'react'
import { Select, MenuItem, InputBase } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const CustomInput = withStyles(() => ({
  root: {  },
  input: {
    fontSize: 14,
    padding: 0,
    paddingRight: 20,
    color: '#999'
  },
}))(InputBase);


function CustomSelect({data, primary, onChangeData, onChange = () => null}) {

  const [select, setSelect] = useState(primary)
  const handleSelect = (evt) => {
    setSelect(evt.target.value)
    onChange({...onChangeData, data: evt.target.value})
  }
  const selectItems = data.map(item => <MenuItem key={item} value={item} children={item} />)

  return (
    <Select
      value={select}
      color='inherit'
      name='selectname'
      input={<CustomInput />}
      onChange={handleSelect}
      className='CustomSelect'
      children={selectItems}
      />
  )
}

export default CustomSelect