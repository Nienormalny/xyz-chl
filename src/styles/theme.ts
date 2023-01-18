const theme = {
    colors: {
        grayScale: {
            gray900: '#2C2C2C',
            gray800: '#4B4B4B',
            gray700: '#6E6E6E',
            gray600: '#8E8E8E',
            gray500: '#B3B3B3',
            gray400: '#CACACA',
            gray300: '#E1E1E1',
            gray200: '#EAEAEA',
            gray100: '#F5F5F5',
            gray75: '#FAFAFA',
            gray50: '#FFFFFF',
        },
        primaryScale: {
            primary50: '#F2FEFF',
            primary75: '#D6F8FB',
            primary100: '#BAF3F7',
            primary200: '#85E9EF',
            primary300: '#58DEE6',
            primary400: '#36D1DA',
            primary500: '#1FC1CA',
            primary600: '#1aaeb7',
            primary700: '#109BAA',
            primary800: '#078699',
            primary900: '#007187',
        },
        primary: '#1aaeb7',
        secondary: '#004b44',
        tertiary: '#d94841',
        card: {
            title: "#292929",
        }
    },
    fonts: ['Gotham'],
    fontSizes: {
        display2Xl: ["4.5rem", "5.625rem", "-0.2rem"],
        displayXl: ["3.75rem", "4.625rem", "-0.2rem"],
        displayLg: ["3rem", "3.75rem", "-0.2rem"],
        displayMd: ["2.25rem", "2.75rem", "-0.2rem"],
        displaySm: ["1.875rem", "2.375rem"],
        displayXs: ["1.5rem", "2rem"],
        textXl: ["1.25rem", "1.875rem"],
        textLg: ["1.125rem", "1.75rem"],
        textMd: ["1rem", "1.5rem"],
        textSm: ["0.875rem", "1.25rem"],
        textXs: ["0.75rem", "1.125rem"],
    },
    card: {
        br: "1rem",
        pd: "1.4rem"
    },
    breakPoints: {
        mobile: "418px",
        tablet: "769px",
        desktop: "1441px",
    },
};
export default theme;

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}