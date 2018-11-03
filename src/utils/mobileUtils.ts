import * as MobileDetect from "mobile-detect";

const mobileDetect =
    (global as any).IS_SERVER_SIDE === undefined ? undefined : new MobileDetect(window.navigator.userAgent);
export const IS_MOBILE = mobileDetect === undefined ? false : mobileDetect.mobile() !== null;
