import { Roboto, Noto_Sans_KR } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  display: 'swap',
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#2272eb',
    },
    secondary: {
      main: '#4593fc',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: notoSansKr.style.fontFamily,
  },
});

export default theme;
