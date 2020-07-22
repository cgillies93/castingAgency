import React from 'react';
import './CreateButton.css';
import { useAuth0 } from "@auth0/auth0-react";

class CreateButton extends React.Component {
  constructor(props) {
    super(props)
  }

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  render() {
    return (
      <div onClick={() => {this.navTo('/actors/create')}} className="create-button flex">
        <h2 className="add">+</h2>
        <h2 className="create">Create</h2>
      </div>
    );
  }
}

export default CreateButton;
