import * as React from "react";
import { connect } from "react-redux";
import { ICurrentUserState, IAppState, selectCurrentUser } from "../store";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { FIREBASE_SERVICE } from "../services";
import { Page, GET_NAV_URL } from "../utils";

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
                <span className="app-title">Guitar Tabs</span>
                {isLoggedIn && this.renderUser()}
                {isLoggedIn && this.renderLogout()}
                {!isLoggedIn && this.renderLogin()}
            </div>
        );
    }

    private renderLogout = () => {
        return <span onClick={this.handleLogoutClick}>Logout</span>;
    };

    private renderUser = () => {
        const { currentUser } = this.props;
        if (currentUser === undefined) {
            return;
        }
        return <span>{currentUser.displayName}</span>;
    };

    private renderLogin = () => {
        return <Link to={GET_NAV_URL[Page.Login]()}>Login</Link>;
    };

    private handleLogoutClick = () => {
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
