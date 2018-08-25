import "es6-shim";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { GuitarApp } from "./components";

const appElement = document.getElementById("app");

if (appElement != null) {
    ReactDOM.render(<GuitarApp />, appElement);
}
