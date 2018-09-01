import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong } from "../../store";
import { Dispatch } from "redux";
import { ISongApi } from "../../commons";
import { SongHeader } from "./songHeader";
import { SongEditor } from "./songEditor";

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
        return (
            <div className="song">
                <SongHeader id={id} />
                <div className="song-content-container">
                    <SongEditor id={id} />
                </div>
            </div>
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
