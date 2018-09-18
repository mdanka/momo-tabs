import { matchPath } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import * as queryString from "query-string";

export enum Page {
    Home = "home",
    SignIn = "signin",
    Song = "song",
    TermsOfService = "terms-of-service",
    PrivacyPolicy = "privacy-policy",
}

export const GET_NAV_URL = {
    [Page.Home]: () => "/",
    [Page.SignIn]: (redirectUrl?: string) => `/signin${redirectUrl === undefined ? "" : `?redirectUrl=${redirectUrl}`}`,
    [Page.Song]: (id: string) => `/songs/${id}`,
    [Page.TermsOfService]: () => `/terms-of-service`,
    [Page.PrivacyPolicy]: () => `/privacy-policy`,
};

export const GET_NAV_URL_TEMPLATE = {
    [Page.Home]: GET_NAV_URL[Page.Home](),
    [Page.SignIn]: GET_NAV_URL[Page.SignIn](),
    [Page.Song]: `/songs/:id`,
    [Page.TermsOfService]: GET_NAV_URL[Page.TermsOfService](),
    [Page.PrivacyPolicy]: GET_NAV_URL[Page.PrivacyPolicy](),
};

interface ISongRouteComponentParams {
    id: string;
}

interface ISignInRouteQueryParams {
    redirectUrl: string | undefined;
}

export const GET_NAV_URL_MATCH = {
    [Page.Song]: (pathName: string) => {
        return matchPath<ISongRouteComponentParams>(pathName, {
            path: GET_NAV_URL_TEMPLATE[Page.Song],
        });
    },
};

export const GET_NAV_URL_QUERY_PARAMS = {
    [Page.SignIn]: (value: string) => queryString.parse(value) as ISignInRouteQueryParams,
};

export const SIGN_IN_AND_RETURN = (reactRouterProps: RouteComponentProps<any>) => {
    const { history } = reactRouterProps;
    const currentPath = history.location.pathname;
    history.push(GET_NAV_URL[Page.SignIn](currentPath));
};

const PAGE_TITLE_BASE = "Momo Tabs";

export function GET_PAGE_TITLE(suffix?: string) {
    if (suffix === undefined) {
        return PAGE_TITLE_BASE;
    }
    return `${PAGE_TITLE_BASE} | ${suffix}`;
}
