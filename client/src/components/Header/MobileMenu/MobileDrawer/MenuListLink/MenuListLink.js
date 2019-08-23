import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListItem } from '@material-ui/core'
import { closeMobileMenu } from '../../../../../actions/trigers'

function MenuListLink({ link, text, closeMenu }) {
  return (
    <ListItem button className='listItem' onClick={closeMenu}>
      <Link to={link} className='link' children={text} />
    </ListItem>
  )
}

const mapDispatchToProps = dispatch => ({
  closeMenu: () => dispatch(closeMobileMenu())
})

export default connect(null, mapDispatchToProps)(MenuListLink)