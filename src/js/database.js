import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCWm0-iVDW5o6E7e4Nv0OAKLNVYhY5bHcc",
  authDomain: "nightlife-f66f7.firebaseapp.com",
  databaseURL: "https://nightlife-f66f7.firebaseio.com",
  storageBucket: "nightlife-f66f7.appspot.com",
  messagingSenderId: "656705085280"
};

firebase.initializeApp(config);

export default firebase;
