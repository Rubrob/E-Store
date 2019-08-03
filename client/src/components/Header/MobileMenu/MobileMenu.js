import React from 'react'
import './MobileMenu.sass'
import { connect } from 'react-redux'
import { SwipeableDrawer, IconButton } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import MobileDrawer from './MobileDrawer/MobileDrawer'
import { openMobileMenu, closeMobileMenu } from '../../../reducers/actions/trigers'

function MobileMenu({state, open, close}) {
  return (
    <>
      <IconButton color='inherit' className='MobileMenuTriger' onClick={open} children={<MoreVert/>} />
      <SwipeableDrawer anchor='right' className='MobileMenu' open={state} onClose={close} onOpen={open}>
        <MobileDrawer />
      </SwipeableDrawer>
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