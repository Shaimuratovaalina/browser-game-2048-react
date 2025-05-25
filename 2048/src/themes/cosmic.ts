import defaultTheme, { defaultPalette } from './default';
import { Theme } from './types';

const cosmicTheme: Theme = {
  ...defaultTheme,
  borderRadius: '12px',
  palette: {
    ...defaultPalette,
    primary: '#004aad', // Темно-синий
    secondary: '#001f3f', // Очень темно-синий
    tertiary: '#94B4C1', // Светло-серо-голубой
    foreground: '#ffffff',
    background: '#0a0a23',
    backdrop: '#000000',
    tile2: '#1e1e52',
    tile4: '#2c2ca6',
    tile8: '#4d4dff',
    tile16: '#7fbfff',
    tile32: '#a3d1ff',
    tile64: '#ccf2ff',
    tile128: '#ffccff',
    tile256: '#ffb3ff',
    tile512: '#ff99ff',
    tile1024: '#ff66cc',
    tile2048: '#ff3399',
  },
};

export default cosmicTheme;