import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const Theme = ({ children }) => {
  const modes = {
    light: {
      primaryLight: "light-primary",
      secondaryLight: "light-secondary",
      thirdLight: "light-third ",
      fourthLight: "light-fourth"
    },

    dark: {
      primaryDark: "dark-primary",
      secondaryDark: "dark-secondary",
      thirdDark: "dark-third ",
      fourthDark: "dark-fourth"
    },
  };
  const [mode, setMode] = useState(modes.light);
  const [currentMode, setCurrentMode] = useState(true);

  const modeSwitch = (value) => {
    if (value) {
      setMode(modes.dark)
      setCurrentMode(false);
    } else {
      setMode(modes.light)
      setCurrentMode(true);
    }
    console.log(currentMode)
  };

  return (
    <ThemeContext.Provider value={{modes, mode, currentMode, modeSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
};
