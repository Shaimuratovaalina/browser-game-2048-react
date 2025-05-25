import { Theme } from './types';

const theme: Theme = {
  name: 'forest', // ✅ Добавлено
  borderRadius: '12px',
  palette: {
    transparent: 'transparent',
    black: '#000000',
    white: '#ffffff',
    primary: '#2d5d2c',
    secondary: '#7fbf7f',
    tertiary: '#4d774e',
    foreground: '#ffffff',
    background: '#d4edc4',
    backdrop: '#1e3d1e',
    tile2: '#a3c9a8',
    tile4: '#8cb88c',
    tile8: '#75a675',
    tile16: '#5e955e',
    tile32: '#478447',
    tile64: '#307330',
    tile128: '#276227',
    tile256: '#1d511d',
    tile512: '#134013',
    tile1024: '#0a2f0a',
    tile2048: '#001e00',
  },
};

export default theme;