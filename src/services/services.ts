import { FirebaseService } from "./firebaseService";
import { FirebaseAuthService } from "./firebaseAuthService";
import { DataService } from "./dataService";
import { FirestoreService } from "./firestoreService";
import { Store } from "redoodle";
import { IAppState } from "../store";
import { FirebaseAuthUiService } from "./firebaseAuthUiService";

export interface IGlobalServices {
    firebaseService: FirebaseService;
    firebaseAuthService: FirebaseAuthService;
    firebaseAuthUiService: FirebaseAuthUiService;
    firestoreService: FirestoreService;
    dataService: DataService;
}

function getServices(store: Store<IAppState> | undefined): IGlobalServices {
    const firebaseService = new FirebaseService();
    const firebaseAuthService = new FirebaseAuthService(firebaseService.getApp().auth(), store);
    const firebaseAuthUiService = new FirebaseAuthUiService(store);
    const firestoreService = new FirestoreService(firebaseService.getApp().firestore());
    const dataService = new DataService(firebaseService.getApp().firestore(), firebaseAuthService, store);
    return {
        firebaseService,
        firebaseAuthService,
        firebaseAuthUiService,
        firestoreService,
        dataService,
    };
}

let GLOBAL_SERVICES: IGlobalServices | undefined;

export function getGlobalServices() {
    return GLOBAL_SERVICES;
}

export function initializeAndGetClientSideServices(store: Store<IAppState>) {
    GLOBAL_SERVICES = getServices(store);
    return GLOBAL_SERVICES;
}

export function initializeAndGetServerSideServices() {
    GLOBAL_SERVICES = getServices(undefined);
    return GLOBAL_SERVICES;
}
