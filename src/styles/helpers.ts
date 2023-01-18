import theme from "./theme";

export const textFlow = (textData: string[]): string => {
    const [fs, lh, ts] = textData;
    return `font-size: ${fs}; line-height: ${lh}; ${ts ? ('letter-spacing: '+ ts +';') : ""}`
}

export const device = {
    mobile: `(max-width: ${theme.breakPoints.mobile})`,
    tablet: `(min-width: ${theme.breakPoints.mobile}) and (max-width: ${theme.breakPoints.tablet})`,
    mobileAndTablet: `(max-width: ${theme.breakPoints.tablet})`,
    desktop: `(min-width: ${theme.breakPoints.tablet})`,
}