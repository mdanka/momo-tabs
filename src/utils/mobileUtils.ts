import * as MobileDetect from "mobile-detect";
import { isServer } from "./ssrUtils";

const mobileDetect = isServer() ? undefined : new MobileDetect(window.navigator.userAgent);
export const IS_MOBILE = mobileDetect === undefined ? false : mobileDetect.mobile() !== null;
