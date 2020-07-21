import React from 'react';
import './LogIn.css';
import { AuthConsumer } from '../../../authContext.js';

const LogIn = () => (

  <AuthConsumer>
  {({ initiateLogin }) => (
    <button className="login-button" onClick={initiateLogin}>
      Login
    </button>
  )}
  </AuthConsumer>
);

export default LogIn;
