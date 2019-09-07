import React, { useState } from 'react'
import './ProfilePage.sass'
import { connect } from 'react-redux'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import ProfileShippingAddress from './ProfileShippingAddress/ProfileShippingAddress'
import ProfileBillingAddress from './ProfileBillingAddress/ProfileBillingAddress'
import { Button, Typography } from '@material-ui/core'

const ProfilePage = ({ fullname }) => {
  const [open, setOpen] = useState(true)

  return (
    <div className='profilePage'>
      <Typography variant='h5' component='h2' align='center' className='profilePage-title' children={`Hi, ${fullname}`} />
      <div className={'profilePage-forms'}>
        <Button
          disableRipple
          className='profilePage-customExpand'
          onClick={() => setOpen(!open)}>
          Your Addresses
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
        {open &&
          <>
            <div className='profilePage-forms-form' children={<ProfileShippingAddress />} />
            <div className='profilePage-forms-form' children={<ProfileBillingAddress />} />
          </>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  fullname: state.auth.fullname,
})

export default connect(mapStateToProps, null)(ProfilePage)