export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  brandNavy: string;
  brandNavyDark: string;
  brandNavyLight: string;
  brandOrange: string;
  brandOrangeDark: string;
  brandOrangeLight: string;
  brandYellow: string;
  white: string;
  black: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
}

