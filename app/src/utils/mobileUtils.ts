import * as MobileDetect from "mobile-detect";

const mobileDetect = new MobileDetect(window.navigator.userAgent);

export function isMobile() {
    return mobileDetect.mobile() !== null;
}
