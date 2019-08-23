import React from 'react'
import { connect } from 'react-redux'
import { SwipeableDrawer, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { MoreVert } from '@material-ui/icons'
import MobileDrawer from './MobileDrawer/MobileDrawer'
import { openMobileMenu, closeMobileMenu } from '../../../actions/trigers'

const CustomSwipeableDrawer = withStyles(() => ({
  root: {
    '& .MuiDrawer-paper': {
      overflowY: 'visible !important'
    },
    '@media (min-width: 959.5px)': {
      display: 'none'
    }
  }
}))(SwipeableDrawer)

const MobileMenuTriger = withStyles(() => ({
  root: {
    '@media (min-width: 959.5px)': {
      display: 'none'
    }
  }
}))(IconButton)

function MobileMenu({state, open, close}) {
  return (
    <>
      <MobileMenuTriger
        color='inherit'
        className='MobileMenuTriger'
        onClick={open}
        children={<MoreVert/>} />
      <CustomSwipeableDrawer
        anchor='right'
        open={state}
        onClose={close}
        onOpen={open}
        children={<MobileDrawer />}
        className='MobileMenu' />
    </>
  );
}

const mapStateToProps = state => ({
  state: state.trigers.state
})
const mapDispatchToProps = dispatch => ({
  open: () => dispatch(openMobileMenu()),
  close: () => dispatch(closeMobileMenu())
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu)