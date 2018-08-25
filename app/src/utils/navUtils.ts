import { matchPath } from "react-router-dom";

export enum Page {
    Home = "home",
    SignIn = "signin",
    Song = "song",
}

export const GET_NAV_URL = {
    [Page.Home]: () => "/",
    [Page.SignIn]: () => "/signin",
    [Page.Song]: (id: string) => `/songs/${id}`,
};

export const GET_NAV_URL_TEMPLATE = {
    [Page.Home]: GET_NAV_URL[Page.Home](),
    [Page.SignIn]: GET_NAV_URL[Page.SignIn](),
    [Page.Song]: `/songs/:id`,
};

interface ISongRouteComponentParams {
    id: string;
}

export const GET_NAV_URL_MATCH = {
    [Page.Song]: (pathName: string) => {
        return matchPath<ISongRouteComponentParams>(pathName, {
            path: GET_NAV_URL_TEMPLATE[Page.Song],
        });
    },
};
