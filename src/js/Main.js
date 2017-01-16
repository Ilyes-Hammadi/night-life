import React from 'react'
import {BrowserRouter, Match, Link} from 'react-router'
import {
  Nav,
  Navbar,
  NavItem,
  Button,
  NavDropdown,
  MenuItem
} from 'react-bootstrap/lib'

import '../css/Main.css'

import firebase from './database'

import App from './App'
import About from './About'

class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      user: null,
      userRef: null
    }
  }
  componentWillMount() {
    this.usersRef = firebase.database().ref('/users')
  }

  login() {
    var provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user.providerData[0];

      const userRef = firebase.database().ref('users/' + user.uid);

      this.setState({
        user: user,
        userRef: userRef
      });

      userRef.on('value', (snap) => {
        // If the user does not exist, create a new account
        if (!snap.exists()){
          // Create new user
          userRef.set({
            username: user.displayName,
          });
        }
      });

    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.setState({user: null});
    }, (error) => {
      // An error happened.
    })
  }

  render() {
    let userElem

    if (this.state.user != null) {
      userElem = <NavItem eventKey={3}>
        <NavDropdown eventKey={3} title={this.state.user.displayName} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick={this.logout.bind(this)}>Logout</MenuItem>
        </NavDropdown>

      </NavItem>
    } else {
      userElem = <NavItem eventKey={3}>
        <Button onClick={this.login.bind(this)}>Login</Button>
      </NavItem>
    }

    return (
      <BrowserRouter>
        <div>
          <Navbar id='nav-bar'>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">NightLife</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1}>
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem eventKey={2}>
                <Link to="/about">About</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              {userElem}
            </Nav>
          </Navbar>

          <Match exactly pattern="/" render={props => <App user={this.state.user} userRef={this.state.userRef}/>}/>
          <Match pattern="/about" component={About}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default Main;
