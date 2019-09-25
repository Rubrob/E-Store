import React, { createRef } from 'react'
import './DesktopSearchBox.sass'
import { withStyles } from '@material-ui/styles'
import { Search, Close } from '@material-ui/icons'
import {
  IconButton,
  Backdrop,
  InputBase,
  Box
} from '@material-ui/core'

const CustomBackdrop = withStyles({
  root: {
    top: 64
  }
})(Backdrop)

const DesktopSearchBox = (props) => {
  const {
    value,
    clear,
    onTextChange,
    suggestions,
    search,
    active,
    setActive,
  } = props

  const input = createRef()

  const exitInput = (input) => {
    input.blur()
    clear()
  }

  const searchBtnClick = () => {
    if(input.current.value){
      search(input.current.value)
      clear()
    }
  }

  const clearSearchBox = () => {
    clear()
    input.current.focus()
  }

  const onKeyUp = (evt) => {
    if(evt.target.value.length){
      if(evt.keyCode === 13){
        search(evt.target.value)
        exitInput(evt.target)
      }
    }

    if(evt.keyCode === 27) {
      exitInput(evt.target)
    }
  }

  const backdropClick = () => {
    clear()
    setActive(false)
  }

  const onChange = (evt) => {
    setActive(!!evt.target.value)
    onTextChange(evt)
  }

  return (
    <Box className='DesktopSearchBox'>
      <IconButton color='inherit' onClick={searchBtnClick} children={<Search />} />
      <InputBase
        name='search'
        placeholder='Search...'
        inputRef={input}
        value={value}
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
        onKeyUp={onKeyUp}
        onChange={onChange}/>
      {!!value.length && <IconButton color='inherit' onClick={clearSearchBox} children={<Close />} />}
      <CustomBackdrop open={active} onClick={backdropClick}/>
      <Box className='suggestions-wrap'>
        {suggestions}
      </Box>
    </Box>
  )
}

export default DesktopSearchBox