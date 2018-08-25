import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";

export const FIREBASE_APP = firebase.initializeApp({
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
    tosUrl: '/terms-of-service',
    privacyPolicyUrl: '/privacy-policy',
  };

export const FIREBASE_AUTH_UI = new firebaseui.auth.AuthUI(firebase.auth());

export function FIREBASE_AUTH_START(element: string | Element) {
    FIREBASE_AUTH_UI.start(element, firebaseAuthUiConfig);
}
