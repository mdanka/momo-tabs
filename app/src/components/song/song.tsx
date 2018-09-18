import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong } from "../../store";
import { Dispatch } from "redux";
import { ISongApi } from "../../commons";
import { SongHeader } from "./songHeader";
import { SongEditor } from "./songEditor";
import { getSongWithPlaceholders } from "../../utils";
import DocumentTitle = require("react-document-title");

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
        const { id, song } = this.props;
        if (song === undefined) {
            return null;
        }
        const { title: fullTitle, artist: fullArtist } = getSongWithPlaceholders(song);
        return (
            <DocumentTitle title={`${fullTitle} - ${fullArtist}`}>
                <div className="song">
                    <SongHeader id={id} />
                    <div className="song-content-container">
                        <SongEditor id={id} />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
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
