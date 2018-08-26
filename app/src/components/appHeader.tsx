import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectCurrentUser } from "../store";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { FIREBASE_AUTH_SERVICE } from "../services";
import { Page, GET_NAV_URL } from "../utils";
import { Avatar, IconButton, Menu, MenuItem, ListItemText } from "@material-ui/core";
import { IUser } from "../commons";

export interface IAppHeaderOwnProps {}

export interface IAppHeaderStateProps {
    currentUser: IUser;
}

export interface IAppHeaderDispatchProps {}

export interface IAppHeaderLocalState {
    isUserMenuOpen: boolean;
}

export type IAppHeaderProps = IAppHeaderOwnProps & IAppHeaderStateProps & IAppHeaderDispatchProps;

export class UnconnectedAppHeader extends React.Component<IAppHeaderProps, IAppHeaderLocalState> {
    private userMenuButtonRef: React.RefObject<HTMLElement>;

    public constructor(props: IAppHeaderProps) {
        super(props);
        this.state = {
            isUserMenuOpen: false,
        };
        this.userMenuButtonRef = React.createRef();
    }

    public render() {
        const { currentUser } = this.props;
        const isLoggedIn = currentUser !== undefined;
        return (
            <div className="app-header">
                <span className="app-title">
                    <Link to={GET_NAV_URL[Page.Home]()}>Momo Tabs</Link>
                </span>
                {isLoggedIn && this.renderUser()}
                {isLoggedIn && this.renderUserMenu()}
                {!isLoggedIn && this.renderSignIn()}
            </div>
        );
    }

    private renderUser = () => {
        const { currentUser } = this.props;
        if (currentUser === undefined) {
            return;
        }
        const { displayName, photoURL } = currentUser;
        const avatar = this.renderAvatar(
            photoURL == null ? undefined : photoURL,
            displayName == null ? undefined : displayName,
        );
        return (
            <IconButton
                className="app-header-avatar-button"
                onClick={this.toggleUserMenu}
                disableRipple={true}
                buttonRef={this.userMenuButtonRef}
            >
                {avatar}
            </IconButton>
        );
    };

    private renderAvatar = (photoUrl: string | undefined, displayName?: string) => {
        const classes = "app-header-avatar-image";
        if (photoUrl !== undefined) {
            return <Avatar className={classes} src={photoUrl} />;
        }
        if (displayName !== undefined) {
            const initials = displayName
                .split(" ")
                .filter(nameComponent => nameComponent.length > 0)
                .map(nameComponent => nameComponent[0])
                .join("");
            return <Avatar className={classes}>{initials}</Avatar>;
        }
        return <Avatar className={classes} />;
    };

    private renderUserMenu = () => {
        const { isUserMenuOpen } = this.state;
        return (
            <Menu open={isUserMenuOpen} onClose={this.closeUserMenu} anchorEl={this.userMenuButtonRef.current}>
                <MenuItem onClick={this.handleSignOutClick}>
                    <ListItemText primary="Sign Out" />
                </MenuItem>
            </Menu>
        );
    };

    private renderSignIn = () => {
        return <Link to={GET_NAV_URL[Page.SignIn]()}>Sign in</Link>;
    };

    private handleSignOutClick = () => {
        FIREBASE_AUTH_SERVICE.authSignOut();
    };

    private closeUserMenu = () => {
        this.setState({ isUserMenuOpen: false });
    };

    private toggleUserMenu = () => {
        const { isUserMenuOpen } = this.state;
        this.setState({ isUserMenuOpen: !isUserMenuOpen });
    };
}

function mapStateToProps(state: IAppState, _ownProps: IAppHeaderOwnProps): IAppHeaderStateProps {
    return {
        currentUser: selectCurrentUser(state),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: IAppHeaderOwnProps): IAppHeaderDispatchProps {
    return {};
}

export const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedAppHeader);
