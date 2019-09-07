import React from 'react'
import { connect } from 'react-redux'
import { toggleFilter} from '../../../../actions/trigers'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledButton = withStyles({
  root: {
    minWidth: 50,
    width: 100,
    height: 50,
    borderRadius: 0,
    marginRight: 20,
    '@media (max-width: 959.5px)': {
      width: 50,
      marginRight: 0
    },
    '&.MuiButtonBase-root.MuiButton-root.MuiButton-text': {
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
      aria-haspopup='true'
      {...rest}>
      {text}
      {icon}
    </Button>
  ));

const FilterTriger = (props) => (
  <StyledButton
    className='FilterTriger'
    onClick={props.toggle}
    text={props.label}
    icon={<FontAwesomeIcon icon='sliders-h' />}
    />
)

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleFilter())
})

export default connect(null, mapDispatchToProps)(FilterTriger)