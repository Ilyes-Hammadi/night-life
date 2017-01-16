import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId"
};

firebase.initializeApp(config);

export default firebase;
