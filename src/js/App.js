import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap/lib'

import '../css/App.css';

import SearchBar from './SearchBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Jumbotron className="jumb">
          <h1>Plans tonight?</h1>
          <p>See which bars are hoppin tonight and RSVP ahead of time! Remember: take a cab and drink responsibly.</p>
        </Jumbotron>
        <SearchBar user={this.props.user} userRef={this.props.userRef}/>
      </div>
    );
  }
}

export default App;
