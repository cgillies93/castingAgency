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
import MovieDetails from './components/MovieDetails/MovieDetails.js';
import Auth from './components/Auth0/Auth.js';


class App extends Component {

  render(){

    return (
      <div className="App">
      <Auth>
        <Navigation />
          <div className="body">
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/actors" exact component={ActorsList}/>
                <Route path="/actors/create" exact component={CreateActorForm}/>
                <Route path="/actors/:id" component={ActorDetails} />
                <Route path="/movies" exact component={MoviesList}/>
                <Route path="/movies/create" exact component={CreateMovieForm}/>
                <Route path="/movies/:id" component={MovieDetails}/>
                <Route />
              </Switch>
            </Router>
          </div>
          </Auth>
      </div>
    );
  }
}


export default App;
