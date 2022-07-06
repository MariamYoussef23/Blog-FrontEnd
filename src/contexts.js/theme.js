import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const Theme = ({ children }) => {
  const modes = {
    light: {
      background: "#F5F5F5",
      color: "black",
    },

    dark: {
      background: "#0d1117",
      color: "#f0f6fc",
    },
  };
  const [mode, setMode] = useState(modes.light);
  const [currentMode, setCurrentMode] = useState("light");

  const modeSwitch = () => {
    if (mode === modes.light) {
      setMode(modes.dark);
      setCurrentMode("dark");
    } else {
      setMode(modes.light);
      setCurrentMode("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, currentMode, modeSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
};
