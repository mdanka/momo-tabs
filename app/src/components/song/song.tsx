import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong } from "../../store";
import { Dispatch } from "redux";
import { ISong } from "../../commons";

export interface ISongOwnProps {
    id: string;
}

export interface ISongStateProps {
    song: ISong | undefined;
}

export interface ISongDispatchProps {}

export type ISongProps = ISongOwnProps & ISongStateProps & ISongDispatchProps;

export class UnconnectedSong extends React.Component<ISongProps, {}> {
    public render() {
        const { id } = this.props;
        return (
            <div>
                <div className="guitar-app-header">
                    <span className="song-title">Táplálom</span>
                    <span className="song-performer">
                        by <a href="#">Emil.RuleZ!</a>
                    </span>
                </div>
                <div className="score-editor-container">Hello {id}</div>
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
