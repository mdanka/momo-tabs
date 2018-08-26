import * as firebase from "firebase/app";
import "firebase/firestore";

export class DataService {
    private static COLLECTION_SONGS = "songs";

    private firestore: firebase.firestore.Firestore;

    public constructor(firestore: firebase.firestore.Firestore) {
        this.firestore = firestore;
    }

    public getAllSongs = () => {
        this.firestore.collection(DataService.COLLECTION_SONGS).get();
    };
}
