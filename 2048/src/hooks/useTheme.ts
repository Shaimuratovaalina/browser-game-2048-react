import { useReducer } from 'react';

import cosmicTheme from '../themes/cosmic';
import darkTheme from '../themes/dark';
import defaultTheme from '../themes/default';
import forestTheme from '../themes/forest';
import halloweenTheme from '../themes/halloween';
import neonTheme from '../themes/neon';
import pixelTheme from '../themes/pixel';
import retroTheme from '../themes/retro';

import { Theme, ThemeName } from '../themes/types';

export type ThemeEntity = {
  name: ThemeName;
  value: Theme;
};

const isThemeName = (t: string): t is ThemeName =>
  [
    'default',
    'dark',
    'retro',
    'cosmic',
    'pixel',
    'halloween',
    'forest',
    'neon',
  ].includes(t);

const getTheme = (name: ThemeName): ThemeEntity => {
  switch (name) {
    case 'default':
      return { name, value: defaultTheme };
    case 'dark':
      return { name, value: darkTheme };
    case 'retro':
      return { name, value: retroTheme };
    case 'cosmic':
      return { name, value: cosmicTheme };
    case 'pixel':
      return { name, value: pixelTheme };
    case 'halloween':
      return { name, value: halloweenTheme };
    case 'forest':
      return { name, value: forestTheme };
    case 'neon':
      return { name, value: neonTheme };
    default:
      return { name: 'default', value: defaultTheme };
  }
};

const themeReducer = (theme: ThemeEntity, nextThemeName: string) =>
  isThemeName(nextThemeName) ? getTheme(nextThemeName) : theme;

const useTheme = (initialThemeName: ThemeName): [ThemeEntity, (nextTheme: string) => void] => {
  return useReducer(themeReducer, initialThemeName, getTheme);
};

export default useTheme;