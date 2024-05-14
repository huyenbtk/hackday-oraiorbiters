import { CssBaseline, responsiveFontSizes, Theme, ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getThemeConfig, getThemedComponent } from '../../theme/theme';
import { BaseContextProps } from '../../global.config';
import { THEME_MODE } from 'src/theme/type';
// import BaseChartStyle from 'src/theme/chart';

export interface ThemeContextProps {
    toggleThemeMode: () => void;
    mode?: THEME_MODE;
    mobilePoint: boolean;
    ipadPoint: boolean;
    smallDesktop: boolean;
    desktopPoint: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeCustomProvider({ children }: BaseContextProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<THEME_MODE>((): THEME_MODE => {
        let initialMode = localStorage.getItem('theme') as THEME_MODE;
        if (!initialMode) {
            initialMode = prefersDarkMode ? 'dark' : 'light';
            // localStorage.setItem('theme', initialMode);
        }
        return initialMode;
        // return 'light';
    });

    const toggleThemeMode = useCallback(() => {
        setMode((prevMode: THEME_MODE) => {
            const newMode: THEME_MODE = prevMode === 'dark' ? 'light' : 'dark';
            // localStorage.setItem('theme', newMode);
            return newMode;
            // return 'light';
        });
    }, []);

    const theme = useMemo<Theme>(() => {
        const _t = createTheme(getThemeConfig(mode));
        return responsiveFontSizes(deepmerge(_t, getThemedComponent(_t)));
    }, [mode]);

    const mobilePoint = useMediaQuery(theme.breakpoints.down('xsm'));
    const ipadPoint = useMediaQuery(theme.breakpoints.between('xsm', 'md'));
    const smallDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const desktopPoint = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <ThemeContext.Provider value={{ toggleThemeMode, mode, mobilePoint, ipadPoint, smallDesktop, desktopPoint }}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {/* <BaseChartStyle /> */}
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext(ThemeContext);
