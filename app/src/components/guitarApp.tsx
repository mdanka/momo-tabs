import * as React from "react";

export interface IGuitarAppState {
}

export class GuitarApp extends React.Component<{}, IGuitarAppState> {
    // private static LS_KEY_TEMP_SONG = "guitar-app-temp-song";

    public render() {
        return (
            <div className="guitar-app">
                <div className="guitar-app-header">
                    <span className="song-title">Táplálom</span>
                    <span className="song-performer">by <a href="#">Emil.RuleZ!</a></span>
                </div>
                <div className="score-editor-container">
                    Hello
                </div>
            </div>
        );
    }

    // private saveSong = (song: string) => {
    //     localStorage.setItem(GuitarApp.LS_KEY_TEMP_SONG, song);
    // }

    // private loadSong = () => {
    //     return localStorage.getItem(GuitarApp.LS_KEY_TEMP_SONG);
    // }
}
