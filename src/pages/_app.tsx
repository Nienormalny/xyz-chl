import React, { createContext, useState } from "react";
import "../styles/globals.css";
import theme from '@/styles/theme';
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { FilterProvider } from "@/utils/filter.context";
const App: React.FC<AppProps> = ({Component, pageProps}) => {
    return (
        <ThemeProvider theme={theme}>
            <FilterProvider>
                <Component {...pageProps} />
            </FilterProvider>
        </ThemeProvider>
    )
}

export default App;