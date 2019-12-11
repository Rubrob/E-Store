import React, {Component} from 'react'
import './SingUpIn.sass'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {reduxForm, Field} from 'redux-form'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import {Button, Typography, Box, Container} from '@material-ui/core'
import {validate} from '../../validation/checkout'
import {
  signUp,
  logIn,
  oauthThirdParty,
} from '../../actions/auth'
import {notify} from '../../components/Toaster/Toaster'
import StyledInput from './../Checkout/StyledInput/StyledInput'


const LogInFields = () => (
  <>
    <Field className='input' name='email' label='Email' type='email' component={StyledInput} />
    <Field className='input' name='password' autoComplete='on' label='Password' type='password' component={StyledInput} />
  </>
)

const SingUpFields = () => (
  <>
    <Field className='input' name='firstname' label='First Name' component={StyledInput} />
    <Field className='input' name='lastname' label='Last Name' component={StyledInput} />
    <Field className='input' name='email' label='Email' type='email' component={StyledInput} />
    <Field className='input' name='password' autoComplete='on' label='Password' type='password' component={StyledInput} />
  </>
)

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

  toggle = () => this.setState({toggle: !this.state.toggle})
  displayError = () => {
    if (this.props.errorMessage) {
      notify('error', 'Email is already in use')
    }
  }

  onSubmit = async (data) => {
    if(this.state.toggle){
      await this.props.logIn(data)
    }else{
      await this.props.signUp(data);
    }

    this.displayError()
  }

  responseGoogle = async (res) => {
    await this.props.oauthThirdParty({
      access_token: res.accessToken,
      party: 'google'
    });
    this.displayError()
  }

  responseFacebook = async (res) => {
    await this.props.oauthThirdParty({
      access_token: res.accessToken,
      party: 'facebook'
    });
    this.displayError()
  }

  render() {
    const linkText = this.state.toggle ? 'Log In' : 'Sing Up'
    const linkTextReverse = this.state.toggle ? 'Join' : 'Log In'
    const linkTitle = this.state.toggle ? 'Not a member?' : 'Already a member?'
    const formTitle = this.state.toggle ? 'Log In' : 'Create Account'

    return (
      <div className='SingUpIn'>
        <Container className='SingUpIn-container' maxWidth='xs'>
          <Typography variant='h5'>
            {formTitle}
          </Typography>

          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            {this.state.toggle ? <LogInFields /> : <SingUpFields />}
            <Box mt={4}>
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                size='large'
                fullWidth
              >
                {linkText}
              </Button>
            </Box>
          </form>

          <Typography
            variant='overline'
            className='SingUpIn-divider'
          >
            {linkText} Via
          </Typography>

          <div className='oauth-container'>
            <FacebookLogin
              appId={process.env.REACT_APP_FB_CLIENT_ID}
              textButton='FACEBOOK'
              cssClass='SingUpIn-via f'
              fields='name,email,picture'
              callback={this.responseFacebook}
              icon='fa-facebook'
            />
            <GoogleLogin
              clientId={process.env.REACT_APP_G_CLIENT_ID}
              buttonText='GOOGLE'
              className='SingUpIn-via g'
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>

          <Typography
            className='SingUpIn-route'
            variant='body2'
          >
            {linkTitle}
            <Typography
              component='span'
              variant='body2'
              color='textPrimary'
              onClick={this.toggle}
            >
              {linkTextReverse}
            </Typography>
          </Typography>

        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
})
const mapDispatchToProps = dispatch => ({
  signUp: (value) => dispatch(signUp(value)),
  logIn: (value) => dispatch(logIn(value)),
  oauthThirdParty: (value) => dispatch(oauthThirdParty(value)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'sign',
    validate,
    enableReinitialize: true
  })
)(SignUp)
