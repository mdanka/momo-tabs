import * as firebase from "firebase";
import { STORE, SetSongs, ISongsState } from "../store";
import { ISongApi } from "../commons";
import { ReadableId } from "../utils";
import { FIREBASE_AUTH_SERVICE } from "./services";

export class DataService {
    private static COLLECTION_SONGS = "songs";

    private firestore: firebase.firestore.Firestore;

    public constructor(firestore: firebase.firestore.Firestore) {
        this.firestore = firestore;
        this.subscribeToSongs();
    }

    public subscribeToSongs = () => {
        this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .onSnapshot((querySnaphot: firebase.firestore.QuerySnapshot) => {
                const songs: ISongsState = {};
                querySnaphot.forEach(doc => {
                    songs[doc.id] = doc.data() as ISongApi;
                });
                STORE.dispatch(SetSongs.create({ songs }));
            });
    };

    public saveSong = (id: string, song: ISongApi) => {
        return this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .doc(id)
            .update(song);
    };

    public deleteSong = (id: string) => {
        return this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .doc(id)
            .delete();
    };

    public createSong = async () => {
        const currentUser = FIREBASE_AUTH_SERVICE.authGetCurrentUser();
        if (currentUser == null) {
            throw new Error("Cannot create song if user is not logged in.");
        }
        const song: ISongApi = {
            title: "",
            artist: "",
            content: "",
            creatorUserId: currentUser.uid,
            creationTime: firebase.firestore.Timestamp.now(),
        };
        const data = {
            ...song,
            creationTime: firebase.firestore.FieldValue.serverTimestamp(),
        };
        const id = await this.generateId();
        return this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .doc(id)
            .set(data);
    };

    private generateId = async () => {
        const maxNumberOfTries = 1000;
        let numberOfTriesDone = 0;
        while (numberOfTriesDone < maxNumberOfTries) {
            const id = ReadableId.generate();
            const doc = await this.firestore
                .collection(DataService.COLLECTION_SONGS)
                .doc(id)
                .get();
            if (!doc.exists) {
                return id;
            }
            numberOfTriesDone++;
        }
        throw new Error("Failed to generate a song ID that doesn't yet exist.");
    };
}
