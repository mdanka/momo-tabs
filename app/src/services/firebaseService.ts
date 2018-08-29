import * as firebase from "firebase/app";
import "firebase/auth";

export class FirebaseService {
    private firebaseApp: firebase.app.App;

    private firebaseAppConfig = {
        apiKey: "AIzaSyDfSfW5ZWGIBPqMYNioXDmAER0MIrDjF6Q",
        authDomain: "momotabs.com",
        databaseURL: "https://guitar-tabs-app.firebaseio.com",
        projectId: "guitar-tabs-app",
        storageBucket: "guitar-tabs-app.appspot.com",
        messagingSenderId: "884910130877",
    };

    public constructor() {
        this.firebaseApp = firebase.initializeApp(this.firebaseAppConfig);
    }

    public getApp = () => {
        return this.firebaseApp;
    };
}
