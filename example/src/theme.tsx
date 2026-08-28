import * as React from 'react';
import { Appearance, Platform } from 'react-native';

type ThemeName = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;
  divider: string;
  primary: string;
  axis: string;
};

const palettes: Record<ThemeName, ThemeColors> = {
  light: {
    background: 'white',
    surface: '#f2f2f7',
    text: 'black',
    mutedText: '#333',
    border: '#ccc',
    divider: 'rgba(0, 0, 0, 0.12)',
    primary: '#007AFF',
    axis: '#666',
  },
  dark: {
    background: '#000',
    surface: '#1c1c1e',
    text: 'white',
    mutedText: '#ebebf5',
    border: '#3a3a3c',
    divider: 'rgba(255, 255, 255, 0.25)',
    primary: '#0A84FF',
    axis: '#98989f',
  },
};

type ThemeContextValue = {
  theme: ThemeName;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<ThemeName>(() =>
    Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
  );

  React.useEffect(() => {
    if (Platform.OS !== 'web') return;

    // eslint-disable-next-line no-restricted-globals -- guarded by Platform check
    document.body.style.backgroundColor = palettes[theme].background;
  }, [theme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      colors: palettes[theme],
      toggleTheme: () =>
        setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return context;
}

export function useThemedStyles<T>(create: (colors: ThemeColors) => T): T {
  const { colors } = useTheme();
  return React.useMemo(() => create(colors), [create, colors]);
}
