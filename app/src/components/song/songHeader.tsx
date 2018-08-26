import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong } from "../../store";
import { Dispatch } from "redux";
import { ISongApi } from "../../commons";

export interface ISongHeaderOwnProps {
    id: string;
}

export interface ISongHeaderStateProps {
    song: ISongApi | undefined;
    canEditSong: boolean;
}

export interface ISongHeaderDispatchProps {}

export type ISongHeaderProps = ISongHeaderOwnProps & ISongHeaderStateProps & ISongHeaderDispatchProps;

export class UnconnectedSongHeader extends React.Component<ISongHeaderProps, {}> {
    public render() {
        const { song } = this.props;
        if (song === undefined) {
            return null;
        }
        const { title, artist } = song;
        return (
            <div className="song-header">
                <div className="song-header-song-info">
                    <span className="song-header-title">{title}</span>
                    <span className="song-header-artist">
                        by <a href="#">{artist}</a>
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IAppState, ownProps: ISongHeaderOwnProps): ISongHeaderStateProps {
    const { id } = ownProps;
    return {
        song: selectSong(state, id),
        canEditSong: selectCanEditSong(state, id),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISongHeaderOwnProps): ISongHeaderDispatchProps {
    return {};
}

export const SongHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedSongHeader);
