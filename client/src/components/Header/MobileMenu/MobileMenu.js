import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Hidden } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import MobileDrawer from './MobileDrawer/MobileDrawer'
import { openMobileMenu, closeMobileMenu } from '../../../actions/trigers'

const MobileMenu = ({state, open, close}) => (
  <Hidden mdUp>
    <IconButton
      color='inherit'
      onClick={open}
      children={<MoreVert/>} />
    <MobileDrawer
      open={state}
      onClose={close}
      onOpen={open} />
  </Hidden>
);

const mapStateToProps = state => ({
  state: state.trigers.state
})
const mapDispatchToProps = dispatch => ({
  open: () => dispatch(openMobileMenu()),
  close: () => dispatch(closeMobileMenu())
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu)