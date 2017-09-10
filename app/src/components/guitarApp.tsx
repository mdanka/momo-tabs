import { CompositeDecorator, ContentBlock, ContentState, Editor, EditorState } from "draft-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Chords } from "../chords/chords";
import { Chord } from "./chord";

export interface IGuitarAppState {
    editorState: EditorState;
}

export class GuitarApp extends React.Component<{}, IGuitarAppState> {
    private static LS_KEY_TEMP_SONG = "guitar-app-temp-song";

    public constructor(props: {}) {
        super(props);
        const song = this.loadSong() || "Hello\nAre you OK?";
        const contentState = ContentState.createFromText(song);
        const chordDecorator = {
            component: Chord,
            strategy: Chords.chordDecoratorStrategy,
        };
        const compositeDecorator = new CompositeDecorator([chordDecorator]);
        this.state = {
            editorState: EditorState.createWithContent(contentState, compositeDecorator),
        };
    }

    public render() {
        return (
            <div className="guitar-app">
                <div className="guitar-app-header">
                    <span className="song-title">Táplálom</span>
                    <span className="song-performer">by <a href="#">Emil.RuleZ!</a></span>
                </div>
                <div className="score-editor-container">
                    <Editor editorState={this.state.editorState} onChange={this.onChange} />
                </div>
            </div>
        );
    }

    private onChange = (editorState: EditorState) => {
        this.setState({ editorState });
        this.saveSong(editorState.getCurrentContent().getPlainText());
    }

    private saveSong = (song: string) => {
        localStorage.setItem(GuitarApp.LS_KEY_TEMP_SONG, song);
    }

    private loadSong = () => {
        return localStorage.getItem(GuitarApp.LS_KEY_TEMP_SONG);
    }
}
