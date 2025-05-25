import defaultTheme, { defaultPalette } from './default';
import { Theme } from './types';

const pixelTheme: Theme = {
  ...defaultTheme,
  borderRadius: '4px',
  palette: {
    ...defaultPalette,
    primary: '#2d2d2d', // Пиксельно-черный
    secondary: '#595959', // Серый
    tertiary: '#bfbf00', // Желто-зеленый
    foreground: '#ffffff',
    background: '#1a1a1a',
    backdrop: '#000000',
    tile2: '#ff4c4c', // Красный
    tile4: '#ff8000', // Оранжевый
    tile8: '#ffff00', // Желтый
    tile16: '#00cc00', // Зеленый
    tile32: '#00cccc', // Бирюза
    tile64: '#0000ff', // Синий
    tile128: '#cc00cc', // Фиолетовый
    tile256: '#ff6600', // Темно-оранжевый
    tile512: '#00ff00', // Ярко-зеленый
    tile1024: '#00ffff', // Голубой
    tile2048: '#ffffff', // Белый
  },
};

export default pixelTheme;