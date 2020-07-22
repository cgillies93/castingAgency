import React, {Component} from 'react';
import './Movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.movie.title
    }
  }

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  render(){
    return(
      <div onClick={() => {this.navTo(`/movies/${this.state.id}`)}} className="movie-card">
        <div className="movie-image">
          <img />
        </div>
        <h3>{this.state.title}</h3>
      </div>
    );
  }
}

export default Movie;
