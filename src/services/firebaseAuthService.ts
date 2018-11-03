import * as firebase from "firebase/app";
import "firebase/auth";
import { SetCurrentUser, IAppState } from "../store";
import { Store } from "redoodle";

export class FirebaseAuthService {
    public constructor(private firebaseAuth: firebase.auth.Auth, private store: Store<IAppState> | undefined) {
        this.firebaseAuth.onAuthStateChanged(this.setUser);
    }

    public authGetCurrentUser = () => {
        return this.firebaseAuth.currentUser;
    };

    public authIsLoggedIn = () => {
        return this.authGetCurrentUser() != null;
    };

    public authSignOut = () => {
        return this.firebaseAuth.signOut();
    };

    private setUser = (user: firebase.User | null) => {
        const userOrUndefined = user === null ? undefined : user;
        if (this.store !== undefined) {
            this.store.dispatch(SetCurrentUser.create({ currentUser: userOrUndefined }));
        }
    };
}
