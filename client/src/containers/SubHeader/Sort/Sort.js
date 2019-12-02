import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Menu, MenuItem, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { sortByPrice } from '../../../actions/products'
import ImportExportIcon from '@material-ui/icons/ImportExport';


const StyledButton = withStyles({
  root: {
    minWidth: 50,
    width: 100,
    height: 50,
    '@media (max-width: 959.5px)': {
      width: 50
    },
    '&.MuiButton-text': {
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
  })(({icon, label, ...rest}) => (
    <Button
      aria-controls='sort-menu'
      aria-haspopup='true'
      {...rest}>
      {label}
      {icon}
    </Button>
  ));

const Sort = ({ sortByPrice, label }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (evt) => setAnchorEl(evt.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleSort = (method) => {
    sortByPrice(method)
    handleClose()
  }

  return (
    <>
      <StyledButton
        className='Sort'
        onClick={handleClick}
        label={label}
        icon={<ImportExportIcon fontSize='small' />}
      />
      <Menu
        id='sort-menu'
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className='Sort-menu'
      >
        <MenuItem onClick={() => handleSort('low')}>Price: Low - High</MenuItem>
        <MenuItem onClick={() => handleSort('high')}>Price: High - Low</MenuItem>
      </Menu>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  sortByPrice: (method) => dispatch(sortByPrice(method))
})

export default connect(null, mapDispatchToProps)(Sort)