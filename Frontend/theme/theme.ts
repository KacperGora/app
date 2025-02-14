import { TextStyle } from 'react-native';

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: '#F7CAC9',
  secondary: '#C4B283',
  background: '#FFFFFF',
  textPrimary: '#2C3E50',
  textSecondary: '#D1D5DB',
  accent: '#E6E6FA',
  error: '#FF6B6B',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#D1D5DB',
  lightGray: '#F3F4F6',
  darkGray: '#9CA3AF',
  lightBlue: '#EFF6FF',
  darkBlue: '#1E3A8A',
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

export const beautyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#D18E9D',
    onPrimary: '#FFFFFF',
    primaryContainer: '#F6E1E5',
    onPrimaryContainer: '#6C4A5B',

    secondary: '#B0A8B9',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8E3ED',
    onSecondaryContainer: '#4A3D54',

    tertiary: '#F5D7DC',
    onTertiary: '#6C4A5B',

    background: '#FFF8FA',
    onBackground: '#6C4A5B',
    surface: '#FFFFFF',
    onSurface: '#6C4A5B',

    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDADA',
    onErrorContainer: '#410002',

    outline: '#E0D1D6',
    outlineVariant: '#D7C2CA',
    white: '#FFFFFF',
    inverseSurface: '#6C4A5B',
    inverseOnSurface: '#F6E1E5',
    inversePrimary: '#F6B5C0',

    elevation: {
      level0: 'transparent',
      level1: 'rgba(246, 225, 229, 0.5)',
      level2: 'rgba(234, 210, 216, 0.5)',
      level3: 'rgba(224, 195, 202, 0.5)',
      level4: 'rgba(215, 181, 189, 0.5)',
      level5: 'rgba(209, 142, 157, 0.5)',
    },
    surfaceDisabled: 'rgba(108, 74, 91, 0.12)',
    onSurfaceDisabled: 'rgba(108, 74, 91, 0.38)',
    backdrop: 'rgba(108, 74, 91, 0.2)',
  },
  fontSizes: {
    xlarge: 24,
    large: 20,
    regular: 16,
    medium: 14,
    small: 12,
    xSmall: 10,
  },
  spacing: {
    s: 4,
    m: 8,
    l: 16,
    xl: 20,
  },
  shape: {
    borderRadius: 8,
  },
  fontWeight: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semi: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },
};
