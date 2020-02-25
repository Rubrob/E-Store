import React, { Component } from "react";
import "./styles.sass";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Button, Typography, Box, Container } from "@material-ui/core";
import { validate } from "validation";
import { signUp, logIn, oauthThirdParty } from "redux/actions";
import LogInFields from "./LogInFields";
import SingUpFields from "./SignUpFields";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true
    };
  }

  componentDidMount() {
    this.props.isAuthenticated && this.props.history.push("/");
  }

  toggle = () => this.setState({ toggle: !this.state.toggle });

  onSubmit = async data => {
    if (this.state.toggle) {
      await this.props.logIn(data);
    } else {
      await this.props.signUp(data);
    }
  };

  responseThirdParty = party => async res => {
    await this.props.oauthThirdParty(party, res.accessToken);
  };

  renderForm = () => (
    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <>{this.state.toggle ? <LogInFields /> : <SingUpFields />}</>
      <Box mt={4}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          {this.state.toggle ? "Log In" : "Sing Up"}
        </Button>
      </Box>
    </form>
  );

  render() {
    const linkText = this.state.toggle ? "Log In" : "Sing Up";
    const linkTextReverse = this.state.toggle ? "Join" : "Log In";
    const linkTitle = this.state.toggle ? "Not a member?" : "Already a member?";
    const formTitle = this.state.toggle ? "Log In" : "Create Account";

    return (
      <div className="SingUpIn">
        <Container className="SingUpIn-container" maxWidth="xs">
          <Typography variant="h5">{formTitle}</Typography>
          <>{this.renderForm()}</>
          <Typography variant="overline" className="SingUpIn-divider">
            {linkText} Via
          </Typography>

          <div className="oauth-container">
            <FacebookLogin
              appId={process.env.REACT_APP_FB_CLIENT_ID}
              textButton="FACEBOOK"
              cssClass="SingUpIn-via f"
              fields="name,email,picture"
              callback={this.responseThirdParty("facebook")}
              icon="fa-facebook"
            />
            <GoogleLogin
              clientId={process.env.REACT_APP_G_CLIENT_ID}
              buttonText="GOOGLE"
              className="SingUpIn-via g"
              onSuccess={this.responseThirdParty("google")}
              onFailure={this.responseThirdParty("google")}
              cookiePolicy={"single_host_origin"}
            />
          </div>

          <Typography className="SingUpIn-route" variant="body2">
            {linkTitle}
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
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

export default compose(
  connect(
    state => ({
      errorMessage: state.auth.error,
      isAuthenticated: state.auth.isAuthenticated
    }),
    { signUp, logIn, oauthThirdParty }
  ),
  reduxForm({
    form: "sign",
    validate,
    enableReinitialize: true
  })
)(SignUp);
