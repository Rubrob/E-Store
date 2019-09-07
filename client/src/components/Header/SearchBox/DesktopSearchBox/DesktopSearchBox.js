import React, { useState, createRef } from 'react'
import './DesktopSearchBox.sass'
import { withStyles } from '@material-ui/styles'
import { Search, Close } from '@material-ui/icons'
import { IconButton, Backdrop, InputBase } from '@material-ui/core'

const CSSField = withStyles({
  root: {
    color: '#444',
  },
})(InputBase);

const CustomBackdrop = withStyles({
  root: {
    top: 64
  }
})(Backdrop)

function DesktopSearchBox(props) {
  const { value } = props
  const { clear, onTextChange, suggestions, search } = props

  const input = createRef()
  const [open, setOpen] = useState(false)

  const searchBtnClick = () => {
    if(input.current.value){
      search(input.current.value)
      clear('')
    }
  }

  const clearSearchBox = () => {
    clear('')
    setOpen(false)
  }

  const onKeyUp = (evt) => {
    if(evt.target.value.length){
      if(evt.keyCode === 13){
        evt.target.blur()
        search(evt.target.value)
        clear('')
      }
    }

    if(evt.keyCode === 27) {
      evt.target.blur()
      clear('')
    }
  }

  const backdropClick = () => {
    clear('')
    setOpen(false)
  }

  const onChange = (evt) => {
    if(evt.target.value.length){
      setOpen(true)
    }else{
      setOpen(false)
    }
    onTextChange(evt)
  }

  return (
    <div className={'DesktopSearchBox'}>
      <IconButton color='inherit' onClick={searchBtnClick} children={<Search />} />
      <CSSField
        name='search'
        placeholder='Search...'
        inputRef={input}
        value={value}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onKeyUp={onKeyUp}
        onChange={onChange}/>
      {value.length > 0 && <IconButton color='inherit' onClick={clearSearchBox} children={<Close />} />}
      <CustomBackdrop open={open} onClick={backdropClick}/>
      {suggestions.length !== 0 &&
        <div className='suggestions-wrap'>
          {suggestions()}
        </div>}
    </div>
  )
}

export default DesktopSearchBox