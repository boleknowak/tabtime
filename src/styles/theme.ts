import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#eff2fe',
    100: '#e2e6fd',
    200: '#cad0fb',
    300: '#aab1f7',
    400: '#888af1',
    500: '#716be9',
    600: '#624fdc',
    700: '#5441c1',
    800: '#45379c',
    900: '#3b337c',
    950: '#2b2457',
  },
  brandColor: {
    50: '#2b2457',
    100: '#2b2457',
    200: '#2b2457',
    300: '#2b2457',
    400: '#2b2457',
    500: '#2b2457',
    600: '#2b2457',
    700: '#2b2457',
    800: '#2b2457',
    900: '#2b2457',
    950: '#2b2457',
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({ colors, config });
