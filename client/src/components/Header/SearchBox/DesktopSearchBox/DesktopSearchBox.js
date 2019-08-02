import React, { useState, createRef } from 'react'
import './DesktopSearchBox.sass'
import { withStyles } from '@material-ui/styles'
import { Search, Close } from '@material-ui/icons'
import { IconButton, Backdrop } from '@material-ui/core'

const CustomBackdrop = withStyles({
  root: {
    top: 66
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
      setOpen(false)
    }
  }

  const clearSearchBox = () => {
    clear('')
    setOpen(false)
  }

  const onKeyUp = (evt) => {
    if(evt.target.value.length){
      if(evt.keyCode === 13){
        search(evt.target.value)
        clear('')
        setOpen(false)
      }
    }

    if(evt.keyCode === 27) {
      clear('')
      setOpen(false)
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
      <input type='text' name='search' placeholder='Search...' ref={input} value={value} onKeyUp={onKeyUp} onChange={onChange}/>
      {value.length > 0 ? <IconButton color='inherit' onClick={clearSearchBox} children={<Close />} /> : null}
      <CustomBackdrop open={open} onClick={backdropClick}/>
      <div className='suggestions-wrap'>
        {suggestions(() => setOpen(false))}
      </div>
    </div>
  )
}

export default DesktopSearchBox