import React from 'react';
import './MobileCreateButton.css';

class MobileCreateButton extends React.Component {
  constructor(props) {
    super(props)
  }

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  render() {
    return (
      <div onClick={() => {this.navTo('/actors/create')}} className="create-button-mobile">
        <div className='mobile-btn-wrapper'>
          <h2 className="add">+</h2>
          </div>
      </div>

    );
  }
}

export default MobileCreateButton;
