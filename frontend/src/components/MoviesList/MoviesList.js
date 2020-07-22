import React, {Component} from 'react';
import './MoviesList.css';
import Movie from '../Movie/Movie.js';
import CreateButton from '../CreateButton/CreateButton';
import MobileCreateButton from '../CreateButton/MobileCreateButton';
import $ from 'jquery';
import { AuthConsumer } from '../../authContext';
import Can from '../Can/Can';
import { withAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class MoviesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [{
        title: "New Movie",
        genre: "Action",
        releaseDate: "2020 07 18"
      }],
      page: 1,
      totalMovies: 1
    };
    this.getMovies = this.getMovies.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.createPagination = this.createPagination.bind(this);
  }

  componentDidMount(){
    this.getMovies();
  }

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  getMovies = () => {
    $.ajax({
      url: `/movies?page=${this.state.page}`,
      type: "GET",
      success: (result) => {
          console.log(result);
          // this.setState({
          //   movies: result.movies,
          //   totalMovies: result.totalMovies
          // })
        return;
      },
      error: (error) => {
        alert('Unable to load movies. Please try your request again')
        return;
      }
    })
  }

  selectPage(num) {
      this.setState({page: num}, () => this.getMovies());
    }

  createPagination(){
    let pageNumbers = [];
    let maxPage = Math.ceil(this.state.totalMovies / 10)
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`page-num ${i === this.state.page ? 'active' : ''}`}
          onClick={() => {this.selectPage(i)}}>{i}
        </span>)
    }
    return pageNumbers;
  }

  render(){
    return(
      <div className="movies-list">
        <div className="list-header flex">
          <div className="list-title">
            <h2 className="page-title">Movies</h2>
          </div>
          <MobileCreateButton />
        </div>
        <div className="movies-card-list flex">
          {this.state.movies.map((movie, ind) => (
            <Movie
              key={movie.id}
              movie={movie}
              />
          ))}
        </div>
        <div className="pagination-menu">
            {this.createPagination()}
        </div>
      </div>

    );
  }
}

export default withAuth0(MoviesList);
