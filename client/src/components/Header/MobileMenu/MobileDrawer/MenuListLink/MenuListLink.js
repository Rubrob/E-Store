import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListItem } from '@material-ui/core'
import { closeMobileMenu } from '../../../../../reducers/actions/trigers'

function MenuListLink({ link, text, parentLink, closeMenu, nodash }) {
  return (
    <ListItem button className='listItem' onClick={closeMenu}>
      <Link
        to={`${parentLink ? parentLink + `${nodash ? '' : '-'}` : ''}${link}`}
        className='link'
        children={text}
        />
    </ListItem>
  )
}

const mapDispatchToProps = dispatch => ({
  closeMenu: () => dispatch(closeMobileMenu())
})

export default connect(null, mapDispatchToProps)(MenuListLink)