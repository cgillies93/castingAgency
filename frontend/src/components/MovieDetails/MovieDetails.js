import React, {Component} from 'react';
import './MovieDetails.css';
import $ from 'jquery';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_id: 1,
      title: "",
      genre: "",
      releaseDate: 0
    };

    this.getMovieId = this.getMovieId.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);

  }

  componentDidMount(){
    this.getMovieId();
    this.getMovieDetails();
  }


  getMovieId = () => {
    const pathname = this.props.location.pathname;
    const id = pathname.split("/")[2];
    console.log(id);
    this.setState({
      movie_id: id
    });
    console.log(this.state.id)
  }

  getMovieDetails = () => {
    $.ajax({
      url: `/movies/${this.state.id}`,
      type: 'GET',
      success: (result) => {
        console.log(result);
        const movie = result.movie;
        this.setState({
          title: movie.title,
          genre: movie.genre,
          releaseDate: movie.release_date
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
      <div className="movie-details">
        <div className="movie-details-image">
        </div>
        <div className="movie-name">
          <h2>{this.state.title}</h2>
        </div>
        <div className="about-section">
          <h4>About</h4>
          <label>Genre</label>
          <h5>{this.state.genre}</h5>
          <label>Release Date</label>
          <h5>{this.state.releaseDate}</h5>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
