import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Hidden } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import MobileDrawer from './MobileDrawer/MobileDrawer'
import { openMobileMenu, closeMobileMenu } from '../../../actions/trigers'
import { logOut } from '../../../actions/auth'


const MobileMenu = ({
  open,
  onOpen,
  onClose,
  onlogOut,
  categories,
  isAuthenticated
}) => (
  <Hidden mdUp>
    <IconButton
      color='inherit'
      onClick={onOpen}
      children={<MoreVert/>}
    />
    <MobileDrawer
      open={open}
      logOut={onlogOut}
      onClose={onClose}
      onOpen={onOpen}
      categories={categories}
      isAuthenticated={isAuthenticated}
    />
  </Hidden>
);

const mapStateToProps = state => ({
  open: state.trigers.state,
  categories: state.products.categories,
  isAuthenticated: state.auth.isAuthenticated,
})
const mapDispatchToProps = dispatch => ({
  onOpen: () => dispatch(openMobileMenu()),
  onClose: () => dispatch(closeMobileMenu()),
  onlogOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu)