import React from 'react';
import './CreateButton.css';
import { useAuth0 } from "@auth0/auth0-react";

class CreateButton extends React.Component {
  constructor(props) {
    super(props)
  }

  navTo(uri) {
    window.location.href += uri;
  }

  render() {
    return (
      <div onClick={() => {this.navTo('/create')}} className="create-button flex">
       <div className='button-wrapper'>
         <h2 className="adds">+</h2>
         <h2 className="create">Create</h2>
       </div>
      </div>

    );
  }
}

export default CreateButton;
