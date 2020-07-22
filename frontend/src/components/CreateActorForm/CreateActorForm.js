import React, {Component} from 'react';
import './CreateActorForm.css';
import $ from 'jquery';
import { useAuth0 } from '@auth0/auth0-react';

class CreateActorForm extends Component {
  constructor(props){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      age: 23,
      gender: 1
    }
    this.handleChange = this.handleChange.bind(this);
    this.createActor = this.createActor.bind(this);
  }

  createActor = (event) => {
    event.preventDefault();
    $.ajax({
      url: '/actors/create',
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        age: this.state.age,
        gender: this.state.gender
      }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        document.getElementById("add-actor-form").reset();
        return;
      },
      error: (error) => {
        alert('Unable to add actor. Please try your request again')
        return;
      }
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className="create-actor">
        <h2>Create New Actor</h2>
        <form className="create-actor-form" onSubmit={this.createActor}>
          <label>
            First Name
            <input type="text" name="firstName" onChange={this.handleChange}/>
          </label>
          <label>
            Last Name
            <input type="text" name="lastName" onChange={this.handleChange}/>
          </label>
          <label>
            Age
            <input className="age-input" type="text" name="age" onChange={this.handleChange}/>
          </label>
          <label>
            Gender
            <select name="gender" onChange={this.handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <input type="submit" className="button" value="Create"/>
        </form>
      </div>
    );
  }
}

export default CreateActorForm;
