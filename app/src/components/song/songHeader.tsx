import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong } from "../../store";
import { Dispatch } from "redux";
import { ISong } from "../../commons";

export interface ISongHeaderOwnProps {
    id: string;
}

export interface ISongHeaderStateProps {
    song: ISong | undefined;
}

export interface ISongHeaderDispatchProps {}

export type ISongHeaderProps = ISongHeaderOwnProps & ISongHeaderStateProps & ISongHeaderDispatchProps;

export class UnconnectedSongHeader extends React.Component<ISongHeaderProps, {}> {
    public render() {
        return (
            <div className="song-header">
                <div className="song-header-song-info">
                    <span className="song-header-title">Táplálom</span>
                    <span className="song-header-artist">
                        by <a href="#">Emil.RuleZ!</a>
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
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISongHeaderOwnProps): ISongHeaderDispatchProps {
    return {};
}

export const SongHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedSongHeader);
