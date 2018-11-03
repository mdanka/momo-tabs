import * as firebase from "firebase/app";
import { SetSongs, ISongsState, IAppState } from "../store";
import { ISongApi, ISongUpdateApi } from "../commons";
import { ReadableId } from "../utils";
import { Store } from "redoodle";
import { FirebaseAuthService } from "./firebaseAuthService";

export class DataService {
    private static COLLECTION_SONGS = "songs";

    public constructor(
        private firestore: firebase.firestore.Firestore,
        private firebaseAuthService: FirebaseAuthService,
        store: Store<IAppState> | undefined,
    ) {
        this.subscribeToSongs(store);
    }

    public subscribeToSongs = (store: Store<IAppState> | undefined) => {
        if (store === undefined) {
            return;
        }
        this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
                const songs = this.querySnapshotToSongs(querySnapshot);
                store.dispatch(SetSongs.create({ songs }));
            });
    };

    public getAllSongs = async () => {
        try {
            const querySnapshot = await this.firestore.collection(DataService.COLLECTION_SONGS).get();
            return this.querySnapshotToSongs(querySnapshot);
        } catch (error) {
            console.error(`[DataService] Failed to get all song IDs. ${error}`);
            return {} as ISongsState;
        }
    };

    public getAllSongIds = () => {
        return this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .get()
            .then(querySnapshot => {
                return querySnapshot.docs.map(doc => doc.id);
            })
            .catch((reason: any) => console.error(`[DataService] Failed to get all song IDs. ${reason}`));
    };

    public updateSong = (id: string, songUpdate: ISongUpdateApi) => {
        return this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .doc(id)
            .update(songUpdate)
            .catch((reason: any) => console.error(`[DataService] Failed to update song. ${reason}`));
    };

    public deleteSong = (id: string) => {
        return this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .doc(id)
            .delete()
            .catch((reason: any) => console.error(`[DataService] Failed to delete song. ${reason}`));
    };

    public createSong = async () => {
        const currentUser = this.firebaseAuthService.authGetCurrentUser();
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
        await this.firestore
            .collection(DataService.COLLECTION_SONGS)
            .doc(id)
            .set(data)
            .catch((reason: any) => console.error(`[DataService] Failed to create song. ${reason}`));
        return id;
    };

    private generateId = async () => {
        const maxNumberOfTries = 10000;
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

    private querySnapshotToSongs = (querySnapshot: firebase.firestore.QuerySnapshot) => {
        const songs: ISongsState = {};
        querySnapshot.forEach(doc => {
            songs[doc.id] = doc.data() as ISongApi;
        });
        return songs;
    };
}
