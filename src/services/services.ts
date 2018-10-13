import { FirebaseService } from "./firebaseService";
import { FirebaseAuthService } from "./firebaseAuthService";
import { DataService } from "./dataService";
import { FirestoreService } from "./firestoreService";

export const FIREBASE_SERVICE = new FirebaseService();
export const FIREBASE_AUTH_SERVICE = new FirebaseAuthService(FIREBASE_SERVICE.getApp().auth());
export const FIRESTORE_SERVICE = new FirestoreService(FIREBASE_SERVICE.getApp().firestore());
export const DATA_SERVICE = new DataService(FIREBASE_SERVICE.getApp().firestore());
