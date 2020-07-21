import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Navigation from './components/Navigation/Navigation.js';
import ActorsList from './components/ActorsList/ActorsList.js';
import ActorDetails from './components/ActorDetails/ActorDetails.js';
import MoviesList from './components/MoviesList/MoviesList.js';
import Home from './components/Home/Home.js';
import CreateActorForm from './components/CreateActorForm/CreateActorForm.js';
import CreateMovieForm from './components/CreateMovieForm/CreateMovieForm.js';
import { withAuth0 } from "@auth0/auth0-react";
import Auth from './components/Auth0/Auth.js';


class App extends Component {
  render(){

    const { user } = this.props.auth0;

    return (
      <div className="App">
      <Auth>
        <Navigation path />
          <div className="body flex">
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/actors" exact component={ActorsList}/>
                <Route path="/actors/:id" component={ActorDetails} />
                <Route path="/actors/create" component={CreateActorForm}/>
                <Route path="/movies" exact component={MoviesList}/>
                <Route path="/movies/create" component={CreateMovieForm}/>
                <Route />
              </Switch>
            </Router>
          </div>
        </Auth>
      </div>
    );
  }
}


export default withAuth0(App);
