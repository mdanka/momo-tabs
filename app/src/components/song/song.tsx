import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong } from "../../store";
import { Dispatch } from "redux";
import { ISongApi } from "../../commons";
import { SongHeader } from "./songHeader";

export interface ISongOwnProps {
    id: string;
}

export interface ISongStateProps {
    song: ISongApi | undefined;
}

export interface ISongDispatchProps {}

export type ISongProps = ISongOwnProps & ISongStateProps & ISongDispatchProps;

export class UnconnectedSong extends React.Component<ISongProps, {}> {
    public render() {
        const { id, song } = this.props;
        if (song === undefined) {
            return null;
        }
        const { content } = song;
        return (
            <div className="song">
                <SongHeader id={id} />
                <div className="song-container">{content}</div>
            </div>
        );
    }
}

function mapStateToProps(state: IAppState, ownProps: ISongOwnProps): ISongStateProps {
    const { id } = ownProps;
    return {
        song: selectSong(state, id),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISongOwnProps): ISongDispatchProps {
    return {};
}

export const Song = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedSong);
