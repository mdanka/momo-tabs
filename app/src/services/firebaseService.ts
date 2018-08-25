import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import { STORE, SetCurrentUser } from "../store";
import { GET_NAV_URL, Page } from "../utils";

class FirebaseService {
    private firebaseApp: firebase.app.App;
    private firebaseAuthUi: firebaseui.auth.AuthUI;

    private firebaseAppConfig = {
        apiKey: "AIzaSyDfSfW5ZWGIBPqMYNioXDmAER0MIrDjF6Q",
        authDomain: "auth.momotabs.com",
        databaseURL: "https://guitar-tabs-app.firebaseio.com",
        projectId: "guitar-tabs-app",
        storageBucket: "guitar-tabs-app.appspot.com",
        messagingSenderId: "884910130877",
    };

    private firebaseAuthUiConfig = {
        signInSuccessUrl: GET_NAV_URL[Page.Home](),
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        tosUrl: "/terms-of-service",
        privacyPolicyUrl: "/privacy-policy",
        callbacks: {
            signInSuccessWithAuthResult: (authResult: any) => {
                this.setUser(authResult.user);
                // Do not redirect.
                return true;
            },
        },
    };

    public constructor() {
        this.firebaseApp = firebase.initializeApp(this.firebaseAppConfig);
        this.firebaseAuthUi = new firebaseui.auth.AuthUI(firebase.auth());
        this.firebaseApp.auth().onAuthStateChanged(this.setUser);
    }

    public getApp = () => {
        return this.firebaseApp;
    };

    public getAuthUi = () => {
        this.firebaseAuthUi;
    };

    public authStart = (element: string | Element) => {
        this.firebaseAuthUi.start(element, this.firebaseAuthUiConfig);
    };

    public authGetCurrentUser = () => {
        return this.firebaseApp.auth().currentUser;
    };

    public authIsLoggedIn = () => {
        return this.authGetCurrentUser() != null;
    };

    public authSignOut = () => {
        this.firebaseApp.auth().signOut();
    };

    private setUser = (user: firebase.User | null) => {
        const userOrUndefined = user === null ? undefined : user;
        STORE.dispatch(SetCurrentUser.create({ currentUser: userOrUndefined }));
    };
}

export const FIREBASE_SERVICE = new FirebaseService();
