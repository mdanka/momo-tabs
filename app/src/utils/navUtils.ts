export enum Page {
    Home = "home",
    Login = "login",
}

export const GET_NAV_URL = {
    [Page.Home]: () => "/",
    [Page.Login]: () => "/login",
};
