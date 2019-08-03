import React, { useState } from 'react'
import './ProfilePage.sass'
import { connect } from 'react-redux'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import ProfileShippingAddress from './ProfileShippingAddress/ProfileShippingAddress'
import ProfileBillingAddress from './ProfileBillingAddress/ProfileBillingAddress'

function ProfilePage(props) {

  const { fullname } = props
  const [open, setOpen] = useState(true)

  return (
    <div className='profilePage'>
      <h1 className='profilePage-title'>Hi, {fullname}</h1>
      <div className='profilePage-forms'>
        <h2 onClick={() => setOpen(!open)}>
          Your Addresses
          {open ? <ExpandLess /> : <ExpandMore />}
        </h2>
        {open && <>
        <div className='profilePage-forms-shipping'>
          <ProfileShippingAddress />
        </div>
        <div className='profilePage-forms-billing'>
          <ProfileBillingAddress />
        </div>
        </>}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  fullname: state.auth.fullname,
})

export default connect(mapStateToProps, null)(ProfilePage)