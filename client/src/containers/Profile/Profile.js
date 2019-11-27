import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Tabs, Tab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OrdersPage from './OrdersPage/OrdersPage'
import ProfilePage from './ProfilePage/ProfilePage'


const useStyles = makeStyles({
  profile: {
    padding: '60px 20px',
    maxWidth: 1200,
    margin: '0 auto',
  }
})


const Profile = ({match, history}) => {
  const classes = useStyles()

  return (
    <div className={classes.profile}>
      <Tabs
        variant='fullWidth'
        value={history.location.pathname}
        onChange={(evt, value) => history.push(value)}>
        <Tab
          disableRipple
          fullWidth
          value={match.url}
          label='Profile' />
        <Tab
          disableRipple
          fullWidth
          value={`${match.url}/orders`}
          label='Orders' />
      </Tabs>
      <Route exact path={match.url} component={ProfilePage} />
      <Route exact path={`${match.url}/orders`} component={OrdersPage} />
    </div>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(Profile)