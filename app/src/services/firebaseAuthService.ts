import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import { STORE, SetCurrentUser } from "../store";
import { GET_NAV_URL, Page } from "../utils";

export class FirebaseAuthService {
    private firebaseAuth: firebase.auth.Auth;
    private firebaseAuthUi: firebaseui.auth.AuthUI;

    private defaultFirebaseAuthUiConfig = {
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

    public constructor(firebaseAuth: firebase.auth.Auth) {
        this.firebaseAuth = firebaseAuth;
        this.firebaseAuthUi = new firebaseui.auth.AuthUI(firebase.auth());
        this.firebaseAuth.onAuthStateChanged(this.setUser);
    }

    public authStart = (element: string | Element, signInSuccessUrl: string | undefined) => {
        this.firebaseAuthUi.start(element, this.getFirebaseAuthUiConfig(signInSuccessUrl));
    };

    public authGetCurrentUser = () => {
        return this.firebaseAuth.currentUser;
    };

    public authIsLoggedIn = () => {
        return this.authGetCurrentUser() != null;
    };

    public authSignOut = () => {
        this.firebaseAuth.signOut();
    };

    private setUser = (user: firebase.User | null) => {
        const userOrUndefined = user === null ? undefined : user;
        STORE.dispatch(SetCurrentUser.create({ currentUser: userOrUndefined }));
    };

    private getFirebaseAuthUiConfig = (signInSuccessUrl?: string) => {
        return signInSuccessUrl === undefined
            ? this.defaultFirebaseAuthUiConfig
            : {
                  ...this.defaultFirebaseAuthUiConfig,
                  signInSuccessUrl,
              };
    };
}
