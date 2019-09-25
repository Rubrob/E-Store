import React, { createRef, } from 'react'
import './MobileSearchBox.sass'
import { IconButton, InputBase, Box } from '@material-ui/core'
import { Search, Close } from '@material-ui/icons'
import { backdropFilterSupport } from './../../../../utils/index'

const MobileSearchBox = (props) => {
  const {
    value,
    clear,
    search,
    suggestions,
    onTextChange,
    active,
    setActive
  } = props
  const input = createRef()

  document.body.style.overflow = active ? 'hidden' : null

  const openSearchBox = () => setActive(true)

  const searchAndClose = () => {
    if(input.current.value){
      search(input.current.value)
      clear()
    }
  }

  const onKeyUp = (evt) => {
    if(evt.target.value.length){
      if(evt.keyCode === 13) {
        searchAndClose()
      }
    }
  }

  return (
    <Box className={`MobileSearchBox ${active ? 'fixed' : ''}`}>
      {active ?
        <>
          <Box className={`MobileSearchBox-main ${backdropFilterSupport ? 'blur' : ''}`}>
            <IconButton color='inherit' onClick={searchAndClose} children={<Search />} />
            <Box className='MobileSearchBox-main-input'>
              <InputBase
                autoFocus
                fullWidth
                name='search'
                placeholder='Search...'
                inputRef={input}
                value={value}
                onKeyUp={onKeyUp}
                onChange={onTextChange}
                />
            </Box>
            <IconButton color='inherit' onClick={clear} children={<Close />} />
          </Box>
          <Box>
            {suggestions}
          </Box>
        </> :
        <IconButton color='inherit' onClick={openSearchBox} children={<Search />} />}
    </Box>
  )
}

export default MobileSearchBox