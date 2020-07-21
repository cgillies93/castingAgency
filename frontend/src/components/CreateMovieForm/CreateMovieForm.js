import React, {Component} from 'react';
import $ from 'jquery';
import { useAuth0 } from '@auth0/auth0-react';

class CreateMovieForm extends Component {
  constructor(props){
    super();
    this.state = {
      title: "",
      genre: "Romance",
      releaseDate: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.createMovie = this.createMovie.bind(this);
  }

  createMovie = (event) => {
    event.preventDefault();
    $.ajax({
      url: '/movies',
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        title: this.state.title,
        genre: this.state.genre,
        release_date: this.state.releaseDate
      }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        document.getElementById("add-movie-form").reset();
        return;
      },
      error: (error) => {
        alert('Unable to add movie. Please try your request again')
        console.log(this.state);
        return;
      }
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div id="create-movie-form">
        <h2>Create New Movie</h2>
        <form className="form-view" id="add-movie-form" onSubmit={this.createMovie}>
          <label>
            Title
            <input type="text" name="title" onChange={this.handleChange}/>
          </label>
          <label>
            Genre
            <select name="genre" onChange={this.handleChange}>
              <option value="Action">Action</option>
              <option value="Romance">Romance</option>
              <option value="Comedy">Comedy</option>
            </select>
          </label>
          <label>
            Release Date
            <input type="text" name="releaseDate" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
          </label>
          <input type="submit" className="button" value="Create"/>
        </form>
      </div>
    );
  }
}

export default CreateMovieForm;
