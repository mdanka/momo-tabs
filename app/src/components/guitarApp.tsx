import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Login } from "./login";
import { AppHeader } from "./appHeader";
import { GET_NAV_URL, GET_NAV_URL_TEMPLATE, GET_NAV_URL_MATCH, Page } from "../utils";
import { Song } from "./song";
import { HomeScreen } from "./homeScreen";

export interface IGuitarAppState {}

export class GuitarApp extends React.Component<{}, IGuitarAppState> {
    public render() {
        return (
            <BrowserRouter>
                <div className="guitar-app">
                    <AppHeader />
                    <div className="app-content">
                        <Switch>
                            <Route exact path={GET_NAV_URL_TEMPLATE[Page.Home]} render={this.renderHome} />
                            <Route path={GET_NAV_URL_TEMPLATE[Page.SignIn]} render={this.renderRouteAuth} />
                            <Route path={GET_NAV_URL_TEMPLATE[Page.Song]} render={this.renderSong} />
                            <Route render={this.renderRedirectToHome} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }

    private renderHome = (_locationInfo: RouteComponentProps<any>) => {
        return <HomeScreen />;
    };

    private renderRouteAuth = (_locationInfo: RouteComponentProps<any>) => {
        return <Login />;
    };

    private renderSong = (locationInfo: RouteComponentProps<any>) => {
        const match = GET_NAV_URL_MATCH[Page.Song](locationInfo.location.pathname);
        if (match == null) {
            return null;
        }
        const { id } = match.params;
        return <Song id={id} />;
    };

    private renderRedirectToHome = (_locationInfo: RouteComponentProps<any>) => {
        return <Redirect to={GET_NAV_URL[Page.Home]()} />;
    };
}
