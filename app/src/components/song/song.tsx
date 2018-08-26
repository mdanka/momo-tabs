import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong } from "../../store";
import { Dispatch } from "redux";
import { ISongApi } from "../../commons";
import { SongHeader } from "./songHeader";
import { EditableText } from "@blueprintjs/core";
import { updateSong } from "./songUtils";

export interface ISongOwnProps {
    id: string;
}

export interface ISongStateProps {
    song: ISongApi | undefined;
    canEditSong: boolean;
}

export interface ISongDispatchProps {}

export type ISongProps = ISongOwnProps & ISongStateProps & ISongDispatchProps;

export class UnconnectedSong extends React.Component<ISongProps, {}> {
    public render() {
        const { id, song, canEditSong } = this.props;
        if (song === undefined) {
            return null;
        }
        const { content } = song;
        return (
            <div className="song">
                <SongHeader id={id} />
                <EditableText
                    className="song-container"
                    disabled={!canEditSong}
                    onChange={this.onContentChange}
                    value={content}
                    placeholder="Tabs"
                    multiline={true}
                />
            </div>
        );
    }

    private onContentChange = (content: string) => {
        updateSong(this.props, { content });
    };
}

function mapStateToProps(state: IAppState, ownProps: ISongOwnProps): ISongStateProps {
    const { id } = ownProps;
    return {
        song: selectSong(state, id),
        canEditSong: selectCanEditSong(state, id),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISongOwnProps): ISongDispatchProps {
    return {};
}

export const Song = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedSong);
