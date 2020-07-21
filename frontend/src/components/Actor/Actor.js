import React, {Component} from 'react';
import './Actor.css';
import $ from 'jquery';

class Actor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.actor.id,
      first_name: this.props.actor.first_name,
      last_name: this.props.actor.last_name,
      age: this.props.actor.age,
      gender: this.props.actor.gender
    }
  }

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  render(){
    return(
      <div onClick={() => {this.navTo(`/actors/${this.state.id}`)}} className="actor-card">
        <div className="actor-image">
        </div>
        <h3>{this.state.first_name} {this.state.last_name}</h3>
      </div>

    );
  }
}

export default Actor;
