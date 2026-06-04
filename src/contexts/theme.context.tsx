import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type TTheme = "light" | "dark";
type contextType = {
    theme: TTheme;
    handleThemeToggle: () => void;
};

const ThemeContext = createContext<contextType | null>(null);

type TThemeProviderProp = {
    children: React.ReactNode;
};

export const ThemeProvider = function ({ children }: TThemeProviderProp) {
    const [isDark, setIsDark] = useState(function () {
        const storedMode = localStorage.getItem("theme");
        if (storedMode) return storedMode === "dark";
        else return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    const handleThemeToggle = useCallback(() => {
        setIsDark((prev) => !prev);
    }, []);

    const value = useMemo<contextType>(
        () => ({ theme: isDark ? "dark" : "light", handleThemeToggle }),
        [isDark, handleThemeToggle],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = function () {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
