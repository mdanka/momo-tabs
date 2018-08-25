import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Login } from "./login";

export interface IGuitarAppState {
}

export class GuitarApp extends React.Component<{}, IGuitarAppState> {
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/login" render={this.renderRouteAuth} />
                        {/* <Route path="/meals/:userId" render={this.renderMealsForUser} /> */}
                        <Route path="/" render={this.renderIndex} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

    private renderIndex = (_locationInfo: RouteComponentProps<any>) => {
        return (
            <div className="guitar-app">
                <div className="guitar-app-header">
                    <span className="song-title">Táplálom</span>
                    <span className="song-performer">by <a href="#">Emil.RuleZ!</a></span>
                </div>
                <div className="score-editor-container">
                    Hello
                </div>
            </div>
        );
    };

    private renderRouteAuth = (_locationInfo: RouteComponentProps<any>) => {
        return (
            <div className="guitar-app">
                <Login />
            </div>
        );
    };
}
