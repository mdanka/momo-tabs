import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong, selectCanDeleteSong } from "../../store";
import { Dispatch } from "redux";
import { ISongApi } from "../../commons";
import { EditableText } from "@blueprintjs/core";
import { DATA_SERVICE } from "../../services";
import { RouteComponentProps, withRouter } from "react-router";
import { GET_NAV_URL, Page, getSongWithPlaceholders, IS_MOBILE } from "../../utils";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Icon } from "@material-ui/core";
import { MobileEditBlocker } from "../common";

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

export interface ISongHeaderLocalState {
    isDeletionDialogOpen: boolean;
}

export class UnconnectedSongHeader extends React.Component<ISongHeaderProps, ISongHeaderLocalState> {
    public constructor(props: ISongHeaderProps) {
        super(props);
        this.state = {
            isDeletionDialogOpen: false,
        };
    }

    public render() {
        const { id, song, canEditSong } = this.props;
        if (song === undefined) {
            return null;
        }
        const { title, artist } = song;
        return (
            <div className="song-header">
                <div className="song-header-song-info">
                    <MobileEditBlocker isEnabled={canEditSong}>
                        <EditableText
                            key={id}
                            className="song-header-title"
                            disabled={!canEditSong || IS_MOBILE}
                            placeholder="Title"
                            defaultValue={title}
                            onConfirm={this.onTitleChange}
                        />
                    </MobileEditBlocker>
                    <span className="song-header-artist">
                        by{" "}
                        <MobileEditBlocker isEnabled={canEditSong}>
                            <EditableText
                                key={id}
                                disabled={!canEditSong || IS_MOBILE}
                                placeholder="Artist"
                                defaultValue={artist}
                                onConfirm={this.onArtistChange}
                            />
                        </MobileEditBlocker>
                    </span>
                </div>
                <div className="song-header-actions">{this.renderDeleteButton()}</div>
                {this.renderDeleteConfirmationDialog()}
            </div>
        );
    }

    private renderDeleteButton = () => {
        const { canDeleteSong } = this.props;
        return (
            canDeleteSong && (
                <IconButton onClick={this.handleDeleteClick}>
                    <Icon>delete</Icon>
                </IconButton>
            )
        );
    };

    private renderDeleteConfirmationDialog = () => {
        const { song } = this.props;
        if (song === undefined) {
            return;
        }
        const { isDeletionDialogOpen } = this.state;
        const { title: fullTitle, artist: fullArtist } = getSongWithPlaceholders(song);
        return (
            <Dialog maxWidth="xs" onClose={this.handleDeleteCancelled} open={isDeletionDialogOpen}>
                <DialogTitle>
                    Are you sure you want to delete {fullTitle} by {fullArtist}?
                </DialogTitle>
                <DialogContent>Once you delete this song, it cannot be recovered.</DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDeleteCancelled} color="primary">
                        Don't delete
                    </Button>
                    <Button onClick={this.handleDeleteConfirmed} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    private onArtistChange = (artist: string) => {
        const { id } = this.props;
        DATA_SERVICE.updateSong(id, { artist });
    };

    private onTitleChange = (title: string) => {
        const { id } = this.props;
        DATA_SERVICE.updateSong(id, { title });
    };

    private handleDeleteClick = () => {
        this.toggleDeletionDialog();
    };

    private handleDeleteCancelled = () => {
        this.toggleDeletionDialog();
    };

    private handleDeleteConfirmed = async () => {
        const { id, history } = this.props;
        DATA_SERVICE.deleteSong(id);
        history.push(GET_NAV_URL[Page.Home]());
    };

    private toggleDeletionDialog = () => {
        const { isDeletionDialogOpen } = this.state;
        this.setState({ isDeletionDialogOpen: !isDeletionDialogOpen });
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
