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
    width: '50%',
    transition: '.4s',
    fontSize: 16,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ].join(','),
    '&:hover': {
      color: '#444',
      opacity: 1
    },
    '&$selected': {
      color: '#444',
    },
    '&:focus': {
      color: '#444',
    }
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const AntTabs = withStyles({
  root: {
    width: '100%',
    maxWidth: 320,
    margin: '0 auto',
    borderBottom: '1px solid #e5e5e5'
  },
  indicator: {
    backgroundColor: '#444',
  },
})(Tabs);

function Profile(props) {
  const classes = useStyles()

  useEffect(() => {
    if(!props.isAuthenticated && !props.token){
      props.history.push('/register')
    }
  },[props])

  const { match: { url }, history } = props

  return (
    <div className={classes.profile}>
      <AntTabs value={history.location.pathname} onChange={(evt, value) => history.push(value)}>
        <AntTab value={url} label='Profile' />
        <AntTab value={`${url}/orders`} label='Orders' />
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