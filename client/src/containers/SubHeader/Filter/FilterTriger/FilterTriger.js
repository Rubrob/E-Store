import React from 'react'
import { connect } from 'react-redux'
import { toggleFilter} from '../../../../actions/trigers'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import TuneIcon from '@material-ui/icons/Tune';


const StyledButton = withStyles({
  root: {
    minWidth: 50,
    width: 100,
    height: 50,
    marginRight: 20,
    '@media (max-width: 959.5px)': {
      width: 50,
      marginRight: 0
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
      aria-haspopup='true'
      {...rest}>
      {label}
      {icon}
    </Button>
  ));

const FilterTriger = ({
  toggle,
  label
}) => (
  <StyledButton
    className='FilterTriger'
    onClick={toggle}
    label={label}
    icon={<TuneIcon fontSize='small' />}
  />
)

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleFilter())
})

export default connect(null, mapDispatchToProps)(FilterTriger)