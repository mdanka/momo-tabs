import * as React from "react";
import { connect } from "react-redux";
import { ICurrentUserState, IAppState, selectCurrentUser } from "../store";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { FIREBASE_SERVICE } from "../services";
import { Page, GET_NAV_URL } from "../utils";
import { Avatar } from "@material-ui/core";

export interface IAppHeaderOwnProps {}

export interface IAppHeaderStateProps {
    currentUser: ICurrentUserState;
}

export interface IAppHeaderDispatchProps {}

export type IAppHeaderProps = IAppHeaderOwnProps & IAppHeaderStateProps & IAppHeaderDispatchProps;

export class UnconnectedAppHeader extends React.Component<IAppHeaderProps, {}> {
    public render() {
        const { currentUser } = this.props;
        const isLoggedIn = currentUser !== undefined;
        return (
            <div className="app-header">
                <span className="app-title">
                    <Link to={GET_NAV_URL[Page.Home]()}>Guitar Tabs</Link>
                </span>
                {isLoggedIn && this.renderUser()}
                {isLoggedIn && this.renderSignOut()}
                {!isLoggedIn && this.renderSignIn()}
            </div>
        );
    }

    private renderSignOut = () => {
        return <span onClick={this.handleSignOutClick}>Sign out</span>;
    };

    private renderUser = () => {
        const { currentUser } = this.props;
        if (currentUser === undefined) {
            return;
        }
        const { displayName, photoURL } = currentUser;
        if (photoURL !== null) {
            return <Avatar src={photoURL} />;
        }
        if (displayName !== null) {
            const initials = displayName
                .split(" ")
                .filter(nameComponent => nameComponent.length > 0)
                .map(nameComponent => nameComponent[0])
                .join("");
            return <Avatar>{initials}</Avatar>;
        }
        return <Avatar />;
    };

    private renderSignIn = () => {
        return <Link to={GET_NAV_URL[Page.SignIn]()}>Sign in</Link>;
    };

    private handleSignOutClick = () => {
        FIREBASE_SERVICE.authSignOut();
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
