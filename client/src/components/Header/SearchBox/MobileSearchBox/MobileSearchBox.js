import React, { useState, createRef, } from 'react'
import './MobileSearchBox.sass'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, InputBase } from '@material-ui/core'
import { Search, Close } from '@material-ui/icons'

const CSSField = withStyles({
  root: {
    color: '#444',
    padding: '12px 5px',
    fontSize: 15,
    width: '100%',
    border: 'none !important',
  },
})(props => (
  <InputBase
    autoFocus
    name='search'
    placeholder='Search...'
    {...props}
  />
));

function MobileSearchBox(props) {

  const input = createRef()
  const [active, setActive] = useState(false)

  const { value } = props
  const { clear, search, suggestions, onTextChange } = props

  document.body.style = `overflow: ${active ? 'hidden' : 'auto'}`

  const close = () => setActive(false)
  const open = () => setActive(true)

  const searchAndClose = () => {
    if(input.current.value){
      search(input.current.value)
      clear('')
      close()
    }
  }

  const onKeyUp = (evt) => {
    if(evt.target.value.length){
      if(evt.keyCode === 13) {
        searchAndClose()
      }
    }
    if(evt.keyCode === 27) {
      clear('')
      close()
    }
  }

  return (
    <div className={`MobileSearchBox ${active ? 'fixed' : ''}`}>
      {active ?
        <>
          <div className='MobileSearchBox-main'>
            <IconButton color='inherit' onClick={searchAndClose} children={<Search />} />
            <CSSField
              fullWidth
              inputRef={input}
              value={value}
              onKeyUp={onKeyUp}
              onChange={onTextChange}
              />
            <IconButton color='inherit' onClick={close} children={<Close />} />
          </div>
          {suggestions(close)}
        </> :
        <IconButton color='inherit' onClick={open} children={<Search />} />}
    </div>
  )
}

export default MobileSearchBox