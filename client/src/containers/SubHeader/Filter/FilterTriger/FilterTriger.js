import React from 'react'
import { connect } from 'react-redux'
import { toggleFilter} from '../../../../reducers/actions/trigers'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledButton = withStyles({
  root: {
    minWidth: 40,
    width: 90,
    height: 50,
    borderRadius: 0,
    marginRight: 20,
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
      aria-haspopup="true"
      color="inherit"
      {...rest}>
      {text}
      {icon}
    </Button>
  ));

function FilterTriger(props)  {
  return (
    <StyledButton
      className='FilterTriger'
      onClick={props.toggle}
      text={props.title}
      icon={<FontAwesomeIcon icon='sliders-h' />}
      />
  )
}

const mapStateToProps = state => ({
  filterOpen: state.products.filterOpen
})
const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleFilter())
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterTriger)