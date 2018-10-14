import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong } from "../../store";
import { Dispatch } from "redux";
import { Editor, Plugin } from "slate-react";
import { Value, Change } from "slate";
import PlainSerializer from "slate-plain-serializer";
import { DATA_SERVICE } from "../../services";
import { TabPlugin, ChordPlugin, ProcessOnPastePlugin } from "./plugins";
import { MobileEditBlocker, ShadowedScrollBox } from "../common";
import { IS_MOBILE } from "../../utils";

export interface ISongEditorOwnProps {
    id: string;
}

export interface ISongEditorStateProps {
    content: string | undefined;
    isEditable: boolean;
}

export interface ISongEditorDispatchProps {}

interface ISongEditorLocalState {
    value: Value | undefined;
}

export type ISongEditorProps = ISongEditorOwnProps & ISongEditorStateProps & ISongEditorDispatchProps;

const INITIAL_CONTENT = "Tabs";

function contentToValue(content: string | undefined) {
    if (content === undefined) {
        return undefined;
    }
    const contentWithDefault = content.trim() === "" ? INITIAL_CONTENT : content;
    return PlainSerializer.deserialize(contentWithDefault);
}

export class UnconnectedSongEditor extends React.Component<ISongEditorProps, ISongEditorLocalState> {
    private plugins: Plugin[] = [];

    public constructor(props: ISongEditorProps) {
        super(props);
        const { content } = props;
        this.state = {
            value: contentToValue(content),
        };
        const lineTrimmer = (line: string) => line.replace(/(\s|\\r)+$/g, "");
        this.plugins.push(TabPlugin(), ChordPlugin(), ProcessOnPastePlugin([lineTrimmer]));
    }

    public componentDidUpdate(prevProps: ISongEditorProps) {
        const { id: prevId, content: prevContent } = prevProps;
        const { id, content } = this.props;
        if (id !== prevId || prevContent === undefined) {
            this.setState({
                value: contentToValue(content),
            });
        }
    }

    public render() {
        const { isEditable } = this.props;
        const { value } = this.state;
        if (value === undefined) {
            return null;
        }
        return (
            <MobileEditBlocker isEnabled={isEditable}>
                <ShadowedScrollBox type="radial">
                    <Editor
                        className="song-editor"
                        readOnly={!isEditable || IS_MOBILE}
                        onChange={this.onChange}
                        value={value}
                        placeholder="Tabs"
                        plugins={this.plugins}
                    />
                </ShadowedScrollBox>
            </MobileEditBlocker>
        );
    }

    private onChange = (change: Change) => {
        const { isEditable } = this.props;
        if (!isEditable) {
            return;
        }
        const { value } = change;
        this.setState({ value });
        const content = PlainSerializer.serialize(value);
        this.updateSongContent(content);
    };

    private updateSongContent = (content: string) => {
        const { id } = this.props;
        DATA_SERVICE.updateSong(id, { content });
    };
}

function mapStateToProps(state: IAppState, ownProps: ISongEditorOwnProps): ISongEditorStateProps {
    const { id } = ownProps;
    const song = selectSong(state, id);
    const { content } = song === undefined ? { content: undefined } : song;
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
