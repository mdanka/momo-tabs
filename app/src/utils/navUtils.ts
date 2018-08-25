export enum Page {
    Home = "home",
    SignIn = "signin",
}

export const GET_NAV_URL = {
    [Page.Home]: () => "/",
    [Page.SignIn]: () => "/signin",
};
