import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";

class FirebaseService {
    private firebaseApp: firebase.app.App;
    private firebaseAuthUi: firebaseui.auth.AuthUI;

    private firebaseAppConfig = {
        apiKey: "AIzaSyDfSfW5ZWGIBPqMYNioXDmAER0MIrDjF6Q",
        authDomain: "guitar-tabs-app.firebaseapp.com",
        databaseURL: "https://guitar-tabs-app.firebaseio.com",
        projectId: "guitar-tabs-app",
        storageBucket: "guitar-tabs-app.appspot.com",
        messagingSenderId: "884910130877"
    };

    private firebaseAuthUiConfig = {
        signInSuccessUrl: "/",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        tosUrl: '/terms-of-service',
        privacyPolicyUrl: '/privacy-policy',
    };

    public constructor() {
        this.firebaseApp = firebase.initializeApp(this.firebaseAppConfig);
        this.firebaseAuthUi = new firebaseui.auth.AuthUI(firebase.auth());
    }

    public getApp = () => {
        return this.firebaseApp;
    }

    public getAuthUi = () => {
        this.firebaseAuthUi;
    }

    public authStart = (element: string | Element) => {
        this.firebaseAuthUi.start(element, this.firebaseAuthUiConfig);
    }

    public authGetCurrentUser = () => {
        return this.firebaseApp.auth().currentUser;
    }

    public authIsLoggedIn = () => {
        return this.authGetCurrentUser() != null;
    }
}

export const FIREBASE_SERVICE = new FirebaseService();
