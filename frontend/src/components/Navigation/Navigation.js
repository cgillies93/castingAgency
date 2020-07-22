import React, {Component} from 'react';
import './Navigation.css';
import LogIn from '../Auth0/LogIn/LogIn.js';
import LogOut from '../Auth0/LogOut/LogOut.js';
import { AuthConsumer } from "../../authContext";
import { withAuth0 } from '@auth0/auth0-react';


class Navigation extends Component {

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  render(){

    const { isAuthenticated } = this.props.auth0;

    return(
      <div className="navigation">
        <div className="nav-wrapper">
          <div className="logo">
            <h1 className="nav-item logo-item" onClick={() => {this.navTo('')}}>Casting Agency</h1>
          </div>
          <div className="nav-items">
          <h2 className="nav-item" onClick={() => {this.navTo('/actors')}}>Actors</h2>
          <h2 className="nav-item" onClick={() => {this.navTo('/movies')}}>Movies</h2>
          </div>
          <div className="login">
            {isAuthenticated ? <LogOut /> : <LogIn /> }
          </div>
        </div>
      </div>

    );
  }
}

export default withAuth0(Navigation);
