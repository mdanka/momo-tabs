import "es6-shim";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GuitarApp } from "./components";
import { createAppStore } from "./store";

const appElement = document.getElementById("app");
const store = createAppStore();

if (appElement != null) {
    ReactDOM.render(
        <Provider store={store}>
            <GuitarApp />
        </Provider>,
        appElement,
    );
}
