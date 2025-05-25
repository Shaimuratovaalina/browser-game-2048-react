import cosmicTheme from './cosmic';
import darkTheme from './dark';
import defaultTheme from './default';
import forestTheme from './forest';
import halloweenTheme from './halloween';
import neonTheme from './neon';
import pixelTheme from './pixel';
import retroTheme from './retro';

export const themes = {
  default: defaultTheme,
  dark: darkTheme,
  cosmic: cosmicTheme,
  retro: retroTheme,
  forest: forestTheme,
  halloween: halloweenTheme,
  neon: neonTheme,
  pixel: pixelTheme,
} as const;