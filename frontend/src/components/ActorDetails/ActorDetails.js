import React, {Component} from 'react';
import './ActorDetails.css';
import $ from 'jquery';

class ActorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      firstName: "",
      lastName: "",
      age: 0,
      gender: ""
    };

    this.getActorId = this.getActorId.bind(this);
    this.getActorDetails = this.getActorDetails.bind(this);

  }


  componentDidMount(){
    this.getActorId();
    this.getActorDetails();
  }

  getActorId = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('id');
    this.setState({
      id: id
    });
  }

  getActorDetails = () => {
    $.ajax({
      url: `/actors/${this.state.id}`,
      type: 'GET',
      success: (result) => {
        console.log(result);
        const actor = result.actor;
        this.setState({
          firstName: actor.first_name,
          lastName: actor.last_name,
          age: actor.age,
          gender: actor.gender
        });
        return;
      },
      error: (error) => {
        console.log(error);
        return;
      }
    })
  }

  render() {

    return (
      <div className="actor-details">
        <div className="actor-details-image">
        </div>
        <div className="actor-name">
          <h2>{this.state.firstName} {this.state.lastName}</h2>
        </div>
        <div className="about-section">
          <h4>About</h4>
          <label>Age</label>
          <h5>{this.state.age}</h5>
          <label>Gender</label>
          <h5>{this.state.gender}</h5>
        </div>
      </div>
    );
  }
}

export default ActorDetails;
