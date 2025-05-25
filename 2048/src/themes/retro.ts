import defaultTheme, { defaultPalette } from './default';
import { Theme } from './types';

const theme: Theme = {
  ...defaultTheme,
  palette: {
    ...defaultPalette,
    primary: '#7E1891',       // Tomato
    secondary: '#3D0301',     // Dark Slate Gray
    tertiary: '#d2b48c',      // Tan
    foreground: '#ffffff',    // White
    background: '#B1D690',    // Black
    backdrop: '#B1D690',      // Black
    tile2: '#309898',         // Bisque
    tile4: '#f0e68c',         // Khaki
    tile8: '#daa520',         // Golden Rod
    tile16: '#CB0404',        // Orange
    tile32: '#780C28',        // Orange Red
    tile64: '#3A7D44',        // Tomato
    tile128: '#E1EACD',       // Coral
    tile256: '#ffa07a',       // Light Salmon
    tile512: '#ff69b4',       // Hot Pink
    tile1024: '#ff1493',      // Deep Pink
    tile2048: '#c71585',      // Medium Violet Red
  },
};

export default theme;