import React, { useEffect } from 'react'
import './Profile.sass'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import OrdersPage from './OrdersPage/OrdersPage'
import ProfilePage from './ProfilePage/ProfilePage'
import { fetchMember } from '../../reducers/actions/auth'

function Profile(props) {

  useEffect(() => { props.fetchMember() },[props])

  const { match: { url } } = props

  if(!props.isAuthenticated && !props.token){
    props.history.push('/register')
  }

  return (
    <div className='Profile'>
      <nav>
        <NavLink exact to={url}>Profile</NavLink>
        <NavLink to={`${url}/orders`}>Orders</NavLink>
      </nav>
      <Route exact path={url} component={ProfilePage} />
      <Route exact path={`${url}/orders`} component={OrdersPage} />
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  fetchMember: () => dispatch(fetchMember())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)