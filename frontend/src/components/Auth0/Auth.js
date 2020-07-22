import React, {Component} from "react";
import auth0 from "auth0-js";

import {AUTH_CONFIG} from "../../auth0-variables.js";
import {AuthProvider} from "../../authContext";

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `casting`,
  responseType: "token id_token"
});

const JWTS_LOCAL_KEY = 'JWTS_LOCAL_KEY';
const JWTS_ACTIVE_INDEX_KEY = 'JWTS_ACTIVE_INDEX_KEY';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      token: ""
    }
  }

  initiateLogin = () => {
    auth.authorize();
  };

  logout = () => {
    this.setState({
      authenticated: false,
      token: ""
    });
  };

  handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
    if (error) {
      console.log(error);
      console.log(`Error ${error.error} occured`);
      return;
    }
    this.setSession(authResult.idTokenPayload);
    console.log(authResult)
    });
  };

  checkTokenFragment() {
    const fragment = window.location.hash.substr(1).split('&')[0].split('=');
    if(fragment[0] === 'access_token'){
      this.token = fragment[1];
    }
    console.log(this.token);
  }


  setSession(data) {
    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      payload: {
        token: data.token
      }
    });
    console.log(this.state)
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
