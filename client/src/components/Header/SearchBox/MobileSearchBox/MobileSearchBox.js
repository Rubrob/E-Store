import React, {createRef} from 'react'
import './MobileSearchBox.sass'
import {IconButton, InputBase, Box} from '@material-ui/core'
import {Search, Close} from '@material-ui/icons'
import {backdropFilterSupport} from './../../../../utils'
import cx from 'classnames'


const MobileSearchBox = ({
  value,
  clear,
  search,
  suggestions,
  onTextChange,
  active,
  setActive
}) => {
  const input = createRef()
  const openSearchBox = () => setActive(true)
  const searchAndClose = () => {
    if(input.current.value){
      search(input.current.value)
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
    <Box className={cx('MobileSearchBox', {
      fixed: active
    })}>
      {active ? (
        <>
          <Box className={cx('MobileSearchBox-main', {
            blur: backdropFilterSupport
          })}>
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
        </>
       ) : (
        <IconButton
          color='inherit'
          onClick={openSearchBox}
          children={<Search />}
        />
      )}
    </Box>
  )
}

export default MobileSearchBox
