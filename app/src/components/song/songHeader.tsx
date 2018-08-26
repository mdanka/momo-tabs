import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong, selectCanDeleteSong } from "../../store";
import { Dispatch } from "redux";
import { ISongApi } from "../../commons";
import { EditableText, AnchorButton } from "@blueprintjs/core";
import { updateSong } from "./songUtils";
import { IconNames } from "@blueprintjs/icons";
import { DATA_SERVICE } from "../../services";
import { RouteComponentProps, withRouter } from "react-router";
import { GET_NAV_URL, Page } from "../../utils";

export interface ISongHeaderOwnProps extends RouteComponentProps<any> {
    id: string;
}

export interface ISongHeaderStateProps {
    song: ISongApi | undefined;
    canEditSong: boolean;
    canDeleteSong: boolean;
}

export interface ISongHeaderDispatchProps {}

export type ISongHeaderProps = ISongHeaderOwnProps & ISongHeaderStateProps & ISongHeaderDispatchProps;

export class UnconnectedSongHeader extends React.Component<ISongHeaderProps, {}> {
    public render() {
        const { song, canEditSong } = this.props;
        if (song === undefined) {
            return null;
        }
        const { title, artist } = song;
        return (
            <div className="song-header">
                <div className="song-header-song-info">
                    <EditableText
                        className="song-header-title"
                        disabled={!canEditSong}
                        placeholder="Title"
                        value={title}
                        onChange={this.onTitleChange}
                    />
                    <span className="song-header-artist">
                        by{" "}
                        <EditableText
                            disabled={!canEditSong}
                            placeholder="Artist"
                            value={artist}
                            onChange={this.onArtistChange}
                        />
                    </span>
                </div>
                <div className="song-header-actions">{this.renderDeleteButton()}</div>
            </div>
        );
    }

    private renderDeleteButton = () => {
        const { canDeleteSong } = this.props;
        return canDeleteSong && <AnchorButton icon={IconNames.TRASH} minimal={true} onClick={this.handleDeleteClick} />;
    };

    private onArtistChange = (artist: string) => {
        updateSong(this.props, { artist });
    };

    private onTitleChange = (title: string) => {
        updateSong(this.props, { title });
    };

    private handleDeleteClick = async () => {
        const { id, history } = this.props;
        await DATA_SERVICE.deleteSong(id);
        history.push(GET_NAV_URL[Page.Home]());
    };
}

function mapStateToProps(state: IAppState, ownProps: ISongHeaderOwnProps): ISongHeaderStateProps {
    const { id } = ownProps;
    return {
        song: selectSong(state, id),
        canEditSong: selectCanEditSong(state, id),
        canDeleteSong: selectCanDeleteSong(state, id),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISongHeaderOwnProps): ISongHeaderDispatchProps {
    return {};
}

export const SongHeader = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(UnconnectedSongHeader),
);
