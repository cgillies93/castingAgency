import React, {Component} from 'react';
import './Navigation.css';
import LogIn from '../Auth0/LogIn/LogIn.js';
import LogOut from '../Auth0/LogOut/LogOut.js';
import { AuthConsumer } from "../../authContext";

class Navigation extends Component {

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  render(){

    return(
      <div className="navigation flex">
        <div className="nav-wrapper flex">
          <div className="logo">
            <h1 className="nav-item logo-item" onClick={() => {this.navTo('')}}>Casting Agency</h1>
          </div>
          <div className="nav-items flex">
          <h2 className="nav-item" onClick={() => {this.navTo('/actors')}}>Actors</h2>
          <h2 className="nav-item" onClick={() => {this.navTo('/movies')}}>Movies</h2>
          </div>
          <div className="login">
            <LogIn />
          </div>
        </div>
      </div>

    );
  }
}

export default Navigation;