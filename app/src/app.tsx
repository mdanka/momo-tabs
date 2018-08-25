import "es6-shim";
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { GuitarApp } from "./components/guitarApp";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDfSfW5ZWGIBPqMYNioXDmAER0MIrDjF6Q",
    authDomain: "guitar-tabs-app.firebaseapp.com",
    databaseURL: "https://guitar-tabs-app.firebaseio.com",
    projectId: "guitar-tabs-app",
    storageBucket: "guitar-tabs-app.appspot.com",
    messagingSenderId: "884910130877"
});

const firebaseAuthUiConfig = {
    signInSuccessUrl: "/login-success",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }
  };

const firebaseAuthUi = new firebaseui.auth.AuthUI(firebase.auth());
firebaseAuthUi.start("#app", firebaseAuthUiConfig);

console.log(firebaseApp.name);

// const appElement = document.getElementById("app");

// if (appElement != null) {
//     ReactDOM.render((
//         <GuitarApp />
//     ), appElement);
// }
