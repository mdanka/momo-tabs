import "es6-shim";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createAppStore } from "./store";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { initializeAndGetClientSideServices } from "./services";

const appElement = document.getElementById("app");
const store = createAppStore();
initializeAndGetClientSideServices(store);

if (appElement != null) {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store} />
        </BrowserRouter>,
        appElement,
    );
}
