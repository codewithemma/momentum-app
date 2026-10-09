import { createContext, useContext, useEffect, useState } from "react";

export type ThemeChoice = "dark" | "light" | "system";

const THEME_STORAGE_KEY = "momentum-theme";

export interface ThemeState {
  theme: ThemeChoice;
  setTheme: (t: ThemeChoice) => void;
  isDark: boolean;
}

/** Provided by the workspace shell so every page inside it shares one theme. */
export const ThemeContext = createContext<ThemeState | null>(null);

export function useLocalTheme(): ThemeState {
  const [theme, setTheme] = useState<ThemeChoice>("dark");
  const [systemDark, setSystemDark] = useState(true);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (
      storedTheme === "dark" ||
      storedTheme === "light" ||
      storedTheme === "system"
    ) {
      // The browser value is unavailable during server rendering.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(storedTheme);
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function updateTheme(nextTheme: ThemeChoice) {
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  const isDark = theme === "dark" || (theme === "system" && systemDark);
  return { theme, setTheme: updateTheme, isDark };
}

export function useTheme(): ThemeState {
  const shared = useContext(ThemeContext);
  const local = useLocalTheme();
  return shared ?? local;
}
