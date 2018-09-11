import * as MobileDetect from "mobile-detect";

const mobileDetect = new MobileDetect(window.navigator.userAgent);
export const IS_MOBILE = mobileDetect.mobile() !== null;
