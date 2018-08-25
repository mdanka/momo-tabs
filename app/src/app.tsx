import "es6-shim";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GuitarApp } from "./components";
import { STORE } from "./store";

const appElement = document.getElementById("app");

if (appElement != null) {
    ReactDOM.render(
        <Provider store={STORE}>
            <GuitarApp />
        </Provider>,
        appElement,
    );
}
