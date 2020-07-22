import React, {Component} from 'react';
import './ActorsList.css';
import Actor from '../Actor/Actor.js';
import CreateButton from '../CreateButton/CreateButton';
import $ from 'jquery';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class ActorsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      actors: [],
      page: 1,
      totalActors: 0
    };
    this.getActors = this.getActors.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.createPagination = this.createPagination.bind(this);
  }

  componentDidMount(){
    this.getActors();
  }

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  getActors = () => {
    $.ajax({
      url: `/actors?page=${this.state.page}`,
      type: "GET",
      success: (result) => {
          console.log(result);
          this.setState({
            actors: result.actors,
            totalActors: result.totalActors
          })
        return;
      },
      error: (error) => {
        alert('Unable to load actors. Please try your request again')
        return;
      }
    })
  }

  selectPage(num) {
      this.setState({page: num}, () => this.getActors());
    }

  createPagination(){
    let pageNumbers = [];
    let maxPage = Math.ceil(this.state.totalActors / 10)
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

    const { isAuthenticated, getAccessTokenSilently } = this.props.auth0;

    return(
      <div className="actors-list">
        <div className="list-header flex">
          <div className="list-title">
            <h2 className="page-title">Actors</h2>
          </div>
            <CreateButton />
        </div>
        <div className="actors-card-list flex">
          {this.state.actors.map((actor, ind) => (
            <Actor
              key={actor.id}
              actor={actor}
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

export default withAuth0(ActorsList);
