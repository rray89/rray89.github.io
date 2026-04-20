export type Theme = "light" | "dark";

export const STORAGE_KEY = "portfolio-theme";
export const THEME_EVENT = "portfolio-theme-change";

const DARK_THEME_QUERY = "(prefers-color-scheme: dark)";

export function readPreferredTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia(DARK_THEME_QUERY).matches
  ) {
    return "dark";
  }

  return "light";
}

export function readTheme(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  const theme = document.documentElement.dataset.theme;
  if (theme === "dark" || theme === "light") {
    return theme;
  }

  return readPreferredTheme();
}

export function writeTheme(theme: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {}

  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeToThemeChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleThemeChange() {
    callback();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      const theme = event.newValue === "dark" || event.newValue === "light"
        ? event.newValue
        : readPreferredTheme();

      if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = theme;
      }

      callback();
    }
  }

  window.addEventListener(THEME_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(THEME_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorage);
  };
}
