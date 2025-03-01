import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  //  Toggle between light & dark mode
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  //  MUI Theme Configuration
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/*  Resets default styles */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};