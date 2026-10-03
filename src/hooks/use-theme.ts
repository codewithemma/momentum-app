import { createContext, useContext, useEffect, useState } from "react";

export type ThemeChoice = "dark" | "light" | "system";

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
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const isDark = theme === "dark" || (theme === "system" && systemDark);
  return { theme, setTheme, isDark };
}

export function useTheme(): ThemeState {
  const shared = useContext(ThemeContext);
  const local = useLocalTheme();
  return shared ?? local;
}
