import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong } from "../../store";
import { Dispatch } from "redux";
import { Editor } from "slate-react";
import { Value, Change } from "slate";
// import { DATA_SERVICE } from "../../services";

export interface ISongEditorOwnProps {
    id: string;
}

export interface ISongEditorStateProps {
    content: string;
    isEditable: boolean;
}

export interface ISongEditorDispatchProps {}

interface ISongEditorLocalState {
    value: Value;
}

export type ISongEditorProps = ISongEditorOwnProps & ISongEditorStateProps & ISongEditorDispatchProps;

export class UnconnectedSongEditor extends React.Component<ISongEditorProps, ISongEditorLocalState> {
    public constructor(props: ISongEditorProps) {
        super(props);
        const { content } = props;
        this.state = {
            value: stringToValue(content),
        };
    }

    public componentDidMount() {}

    public render() {
        const { isEditable } = this.props;
        const { value } = this.state;
        return (
            <Editor
                className="song-editor"
                readOnly={!isEditable}
                onChange={this.onChange}
                value={value}
                placeholder="Tabs"
            />
        );
    }

    private onChange = (change: Change) => {
        const { value } = change;
        this.setState({ value });
    };

    // private updateSongContent = (content: string) => {
    //     const { id } = this.props;
    //     DATA_SERVICE.updateSong(id, { content });
    // };
}

function stringToValue(content: string) {
    return Value.fromJSON({
        document: {
            nodes: [
                {
                    object: "block",
                    type: "paragraph",
                    nodes: [
                        {
                            object: "text",
                            leaves: [
                                {
                                    object: "leaf",
                                    text: content,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    });
}

function mapStateToProps(state: IAppState, ownProps: ISongEditorOwnProps): ISongEditorStateProps {
    const { id } = ownProps;
    const song = selectSong(state, id);
    const { content } = song === undefined ? { content: "" } : song;
    return {
        content,
        isEditable: selectCanEditSong(state, id),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISongEditorOwnProps): ISongEditorDispatchProps {
    return {};
}

export const SongEditor = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedSongEditor);
