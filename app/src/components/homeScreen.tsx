import * as React from "react";
import { SearchWidget } from "./search";

export interface IHomeScreenProps {}

export class HomeScreen extends React.Component<IHomeScreenProps, {}> {
    public render() {
        return (
            <div className="home-screen">
                <SearchWidget />
            </div>
        );
    }
}
