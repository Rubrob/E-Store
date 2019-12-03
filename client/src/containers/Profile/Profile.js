import React, {useState, useEffect} from 'react'
import { matchPath } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OrdersPage from './OrdersPage/OrdersPage'
import ProfilePage from './ProfilePage/ProfilePage'
import { connect } from 'react-redux'
import {
  setShippingAddress,
  setBillingAddress
} from '../../actions/auth'


const useStyles = makeStyles({
  profile: {
    padding: '60px 12px',
    maxWidth: 1200,
    margin: '0 auto',
  }
})


const Profile = ({
  match,
  history,
  location,
  currency,
  orders,
  userShipping,
  userBilling,
  fullname,
  setShipping,
  setBilling,
}) => {
  const classes = useStyles()

  const getModeFromPathname = (pageName, modes, pathname) => (
    Object.entries(modes)
      .map(([mode, suffix]) => ({
        mode,
        ...(matchPath(pathname, {
          path: `/${pageName}${suffix}`,
          exact: true
        }) || {})
      }))
      .find(result => result.path) || {}
  );

  const modes = {
    preview: '',
    orders: '/orders',
  }

  const [state, setState] = useState({
    ...getModeFromPathname('profile', modes, location.pathname),
  })

  const handlePath = async (pathname) => {
    await history.push(pathname)
    const result = await getModeFromPathname('profile', modes, pathname)
    await setState({...result})
  }

  useEffect(() => {
    setState(getModeFromPathname('profile', modes, location.pathname))
  }, [location.pathname, modes])


  return (
    <div className={classes.profile}>
      <Tabs
        variant='fullWidth'
        value={location.pathname}
        onChange={(_, value) => handlePath(value)}>
        <Tab
          disableRipple
          fullWidth
          value={match.url}
          label='Profile'
        />
        <Tab
          disableRipple
          fullWidth
          value={`${match.url}/orders`}
          label='Orders'
        />
      </Tabs>
      {
        state.mode === 'preview' ?
        <ProfilePage
          fullname={fullname}
          userShipping={userShipping}
          userBilling={userBilling}
          setShipping={setShipping}
          setBilling={setBilling}
        /> :
        state.mode = 'orders' ? <OrdersPage currency={currency} orders={orders} /> :
        null
      }
    </div>
  )
}
const mapStateToProps = state => ({
  userShipping: state.auth.addresses.shipping,
  userBilling: state.auth.addresses.billing,
  fullname: state.auth.fullname,
  currency: state.products.currency,
  orders: state.auth.orders
})
const mapDispatchToProps = dispatch => ({
  setShipping: value => dispatch(setShippingAddress(value)),
  setBilling: value => dispatch(setBillingAddress(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)