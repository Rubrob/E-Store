import React, {useState, useEffect} from "react";
import {Select, MenuItem, InputBase} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";


const CustomInput = withStyles(() => ({
  input: {
    fontSize: 14,
    padding: 0,
    paddingRight: 20,
    color: "#777"
  },
}))(InputBase);


const CustomSelect = ({
  data,
  primary,
  onChangeData,
  onChange = () => {}
}) => {
  const [select, setSelect] = useState(primary)
  useEffect(() => {
    setSelect(primary)
  }, [primary])

  const handleSelect = ({target: { value }}) => {
    setSelect(value)
    onChange({...onChangeData, data: value})
  }

  const renderItems = () =>
    data.map((item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ))

  return (
    <Select
      value={select}
      input={<CustomInput />}
      onChange={handleSelect}
    >
      {renderItems()}
    </Select>
  )
}

export default CustomSelect
