import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import ProfileShippingAddress from './ProfileShippingAddress/ProfileShippingAddress'
import ProfileBillingAddress from './ProfileBillingAddress/ProfileBillingAddress'
import { makeStyles, Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  profilePage: {
    minHeight: 300
  },
  title: {
    fontSize: '1.4rem',
    margin: '20px 0',
    color: '#444'
  },
  forms: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  shippingForm: {
    width: '100%',
    maxWidth: 600,
    padding: '20px 0',
    borderBottom: '1px solid #e5e5e5',
    marginBottom: 20
  },
  billingForm: {
    width: '100%',
    maxWidth: 600,
    padding: '20px 0',
    borderBottom: '1px solid #e5e5e5'
  }
})

const CustomButton = withStyles({
  root: {
    padding: 10,
    fontSize: 24,
    display: 'flex',
    textTransform: 'none',
    fontWeight: 700,
    alignItems: 'center',
    color: '#444',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      background: 'none'
    },
    '& svg': {
      paddingTop: 5,
    }
  }
})(Button)

function ProfilePage(props) {
  const classes = useStyles()

  const { fullname } = props
  const [open, setOpen] = useState(true)

  return (
    <div className={classes.profilePage}>
      <Typography variant='h5' component='h2' align='center' className={classes.title} children={`Hi, ${fullname}`} />
      <div className={classes.forms}>
        <CustomButton disableFocusRipple disableRipple onClick={() => setOpen(!open)}>
          Your Addresses
          {open ? <ExpandLess /> : <ExpandMore />}
        </CustomButton>
        {open && <>
          <div className={classes.shippingForm} children={<ProfileShippingAddress />} />
          <div className={classes.billingForm} children={<ProfileBillingAddress />} />
        </>}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  fullname: state.auth.fullname,
})

export default connect(mapStateToProps, null)(ProfilePage)