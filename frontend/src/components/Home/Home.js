import React, {Component} from 'react';
import './Home.css';

class Home extends Component {

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  render(){

    return(
      <div className="home flex">
        <h2>Home</h2>
      </div>
    );
  }
}

export default Home;
