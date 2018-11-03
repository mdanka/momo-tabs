import { createGenerateClassName } from "@material-ui/core/styles";

declare const __SERVER__: boolean;

export const isServer = () => {
    return __SERVER__;
};

export const getMuiJssProviderGenerateClassName = () => {
    return createGenerateClassName({ dangerouslyUseGlobalCSS: false, productionPrefix: "momotabs" });
};
