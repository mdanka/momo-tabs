import { CompositeDecorator, ContentBlock, ContentState, Editor, EditorState } from "draft-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Chords } from "../chords/chords";
import { Chord } from "./chord";

export interface IGuitarAppState {
    editorState: EditorState;
}

export class GuitarApp extends React.Component<{}, IGuitarAppState> {
    public constructor(props: {}) {
        super(props);
        const song = "Hello\nAre you OK?";
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
            <div>
                <Editor editorState={this.state.editorState} onChange={this.onChange} />
            </div>
        );
    }

    private onChange = (editorState: EditorState) => {
        this.setState({ editorState });
    }
}
