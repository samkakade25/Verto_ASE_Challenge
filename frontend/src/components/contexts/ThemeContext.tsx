import { ConfigProvider, theme } from "antd";
import { createContext, useMemo, useState, type ReactNode } from "react";

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>  ({
    isDarkMode: false,
    toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode}> = ({ children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);


    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        document.documentElement.classList.toggle('dark');
    };

    const antdTheme = useMemo(() => ({
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
    }),[isDarkMode]);

    return(
        <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
            <ConfigProvider theme={antdTheme}>
                {children}
            </ConfigProvider>

        </ThemeContext.Provider>
    )
}