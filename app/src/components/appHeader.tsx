import * as React from "react";

export interface IAppHeaderProps {}

export class AppHeader extends React.Component<IAppHeaderProps, {}> {
    public render() {
        return (
            <div className="app-header">
                <span className="app-title">Guitar Tabs</span>
            </div>
        );
    }
}
