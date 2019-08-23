import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Menu, MenuItem, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sortByPrice } from '../../../actions/products'

const StyledMenu = withStyles({
  paper: {
    borderRadius: 0,
    boxShadow: '0 0 5px #e5e5e5'
  },
})(props => (
  <Menu
    id='sort-menu'
    elevation={0}
    getContentAnchorEl={null}
    keepMounted
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
    />
));

const StyledButton = withStyles({
  root: {
    minWidth: 40,
    width: 90,
    height: 50,
    borderRadius: 0,
    '@media (max-width: 959.5px)': {
      width: 50
    },
    '&.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-colorInherit': {
      padding: 0
    },
    '& .MuiButton-label': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 5,
      '@media (max-width: 959.5px)': {
        justifyContent: 'center'
      }
    }
  },
  })(({icon, text, ...rest}) => (
    <Button
      aria-controls='sort-menu'
      aria-haspopup='true'
      color='inherit'
      {...rest}>
      {text}
      {icon}
    </Button>
  ));

function Sort(props) {
  const { sortByPrice } = props
  const { label } = props
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (evt) => {setAnchorEl(evt.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}

  const handleSort = (method) => {
    sortByPrice(method)
    handleClose()
  }

  return (
    <>
      <StyledButton
        className='Sort'
        onClick={handleClick}
        text={label}
        icon={<FontAwesomeIcon icon='sort' />}
      />
      <StyledMenu
        className='Sort-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
        <MenuItem onClick={() => handleSort('low')}>Price: Low - High</MenuItem>
        <MenuItem onClick={() => handleSort('high')}>Price: High - Low</MenuItem>
      </StyledMenu>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  sortByPrice: (method) => dispatch(sortByPrice(method))
})

export default connect(null, mapDispatchToProps)(Sort)