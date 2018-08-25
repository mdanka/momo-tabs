import * as React from "react";
import { FIREBASE_SERVICE } from "../services";

export interface ILoginProps {};

export class Login extends React.Component<ILoginProps, {}> {
    private ref: React.RefObject<HTMLDivElement>;

    constructor(props: ILoginProps) {
        super(props);
        this.ref = React.createRef();
      }

    public componentDidMount() {
        if (this.ref.current == null) {
            return;
        }
        FIREBASE_SERVICE.authStart(this.ref.current);
    }

    public render() {
        return (
            <div ref={this.ref}>
            </div>
        );
    }
}
