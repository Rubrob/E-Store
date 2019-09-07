import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Tabs, Tab } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import OrdersPage from './OrdersPage/OrdersPage'
import ProfilePage from './ProfilePage/ProfilePage'

const useStyles = makeStyles({
  profile: {
    padding: '60px 20px',
    maxWidth: 1200,
    margin: '0 auto',
  }
})

const AntTab = withStyles(() => ({
  root: {
    textTransform: 'none',
    color: '#999',
    fontSize: 16,
    '&:hover': {
      color: '#000',
    },
  },
  selected: {
    color: '#000',
  },
}))(Tab);

const AntTabs = withStyles({
  root: {
    maxWidth: 320,
    margin: '0 auto',
    borderBottom: '1px solid #e5e5e5'
  },
  indicator: {
    backgroundColor: '#000',
  },
})(Tabs);

const Profile = (props) => {
  const classes = useStyles()

  useEffect(() => {
    if(!props.isAuthenticated && !props.token){
      props.history.push('/register')
    }
  }, [props])

  const { match: { url }, history } = props

  return (
    <div className={classes.profile}>
      <AntTabs
        variant='fullWidth'
        value={history.location.pathname}
        onChange={(evt, value) => history.push(value)}>
        <AntTab
          disableRipple
          fullWidth
          value={url}
          label='Profile' />
        <AntTab
          disableRipple
          fullWidth
          value={`${url}/orders`}
          label='Orders' />
      </AntTabs>
      <Route exact path={url} component={ProfilePage} />
      <Route exact path={`${url}/orders`} component={OrdersPage} />
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
})

export default connect(mapStateToProps, null)(Profile)