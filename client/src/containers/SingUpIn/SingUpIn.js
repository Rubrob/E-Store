import React, { Component } from 'react'
import './SingUpIn.sass'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, Field } from 'redux-form'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { Button } from '@material-ui/core'
import { validate } from '../../validation/checkout'
import { signUp, logIn, oauthGoogle, oauthFacebook } from '../../reducers/actions/auth'
import Toaster, { notify } from '../../components/Toaster/Toaster'
import CustomTextField from './../Checkout/CustomTextField/CustomTextField'


function LogInFields(props) {
  return(
    <>
      <Field className='input' name='email' label='Email' type='email' component={CustomTextField} />
      <Field className='input' name='password' autoComplete='on' label='Password' type='password' component={CustomTextField} />
    </>
  )
}
function SingUpFields(props) {
  return(
    <>
      <Field className='input' name='firstname' label='First Name' component={CustomTextField} />
      <Field className='input' name='lastname' label='Last Name' component={CustomTextField} />
      <Field className='input' name='email' label='Email' type='email' component={CustomTextField} />
      <Field className='input' name='password' autoComplete='on' label='Password' type='password' component={CustomTextField} />
    </>
  )
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true
    }
  }
  componentDidMount() {
    this.props.isAuthenticated && this.props.history.push('/')
  }
  componentDidUpdate() {
    this.props.isAuthenticated && this.props.history.push('/')
  }

  toggle = () => this.setState({toggle: !this.state.toggle})
  displayError = () => {
    if (this.props.errorMessage) {
      notify('error', 'Email is already in use')
    }
  }

  submit = async (data) => {
    if(this.state.toggle){
      await this.props.logIn(data)
    }else{
      await this.props.signUp(data);
    }

    this.displayError()
  }

  responseGoogle = async (res) => {
    await this.props.oauthGoogle(res.accessToken);
    this.displayError()
  }

  responseFacebook = async (res) => {
    await this.props.oauthFacebook(res.accessToken);
    this.displayError()
  }

  render() {
    const { handleSubmit } = this.props
    const linkText = this.state.toggle ? 'Log In' : 'Sing Up'
    const linkTextReverse = this.state.toggle ? 'Join' : 'Log In'
    const linkTitle = this.state.toggle ? 'Not a member?' : 'Already a member?'
    const formTitle = this.state.toggle ? 'Log In' : 'Create Account'

    return (
     <div className='SingUpIn'>
      <Toaster />
      <div className='SingUpIn-container'>
        <h2>{formTitle}</h2>

        <form onSubmit={handleSubmit(this.submit)}>
          {this.state.toggle ? <LogInFields /> : <SingUpFields />}
          <Button type='submit' className='submit' children={linkText} />
        </form>

        <div className='SingUpIn-divider'>{linkText} Via</div>

        <div className='oauth-container'>
          <FacebookLogin
            appId='438064760309728'
            // appId={process.env.REACT_APP_FB_CLIENT_ID}
            textButton='FACEBOOK'
            cssClass='SingUpIn-via f'
            fields='name,email,picture'
            callback={this.responseFacebook}
            icon='fa-facebook'
          />
          <GoogleLogin
            clientId='136772154382-ki3smei0i0ulbdvtv87iv9o4k3r5aib8.apps.googleusercontent.com'
            // clientId={process.env.REACT_APP_G_CLIENT_ID}
            buttonText='GOOGLE'
            className='SingUpIn-via g'
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>

        <div className='SingUpIn-route'>
          {linkTitle} <span onClick={this.toggle} children={linkTextReverse} />
        </div>

      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
})
const mapDispatchToProps = dispatch => ({
  signUp: value => dispatch(signUp(value)),
  logIn: value => dispatch(logIn(value)),
  oauthGoogle: value => dispatch(oauthGoogle(value)),
  oauthFacebook: value => dispatch(oauthFacebook(value))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'sign',
    validate,
    enableReinitialize: true
  })
)(SignUp)