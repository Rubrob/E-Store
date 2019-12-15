import React, {createRef} from "react";
import "./styles.sass";
import cx from "classnames";
import {Search, Close} from "@material-ui/icons";
import {IconButton, InputBase, Box} from "@material-ui/core";
import {backdropFilterSupport} from "utils";


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
    <Box className={cx("MobileSearchBox", {
      fixed: active
    })}>
      {active ? (
        <>
          <Box className={cx("MobileSearchBox-main", {
            blur: backdropFilterSupport
          })}>
            <IconButton color="primary" onClick={searchAndClose} children={<Search />} />
            <Box className="MobileSearchBox-main-input">
              <InputBase
                autoFocus
                fullWidth
                name="search"
                placeholder="Search..."
                inputRef={input}
                value={value}
                onKeyUp={onKeyUp}
                onChange={onTextChange}
              />
            </Box>
            <IconButton color="primary" onClick={clear}>
              <Close />
            </IconButton>
          </Box>
          <Box>
            {suggestions}
          </Box>
        </>
       ) : (
        <IconButton
          color="primary"
          onClick={openSearchBox}
          children={<Search />}
        />
      )}
    </Box>
  )
}

export default MobileSearchBox
