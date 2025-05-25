import { ThemeName } from '../themes/types';

export const getTileName = (theme: ThemeName, value: number): string => {
  switch (theme) {
    case 'default':
    case 'dark':
      return value.toString();

    case 'halloween':
      const halloweenMap: Record<number, string> = {
        2: 'Тыква',
        4: 'Привидение',
        8: 'Паук',
        16: 'Кот',
        32: 'Метла',
        64: 'Череп',
        128: 'Зелье',
        256: 'Ведьма',
        512: 'Костёр',
        1024: 'Магия',
        2048: 'Дракон',
      };
      return halloweenMap[value] || value.toString();

    case 'forest':
      const forestMap: Record<number, string> = {
        2: 'Гриб',
        4: 'Белка',
        8: 'Медведь',
        16: 'Ёжик',
        32: 'Лиса',
        64: 'Олень',
        128: 'Фея',
        256: 'Дерево',
        512: 'Сова',
        1024: 'Феникс',
        2048: 'Дракон',
      };
      return forestMap[value] || value.toString();

    case 'cosmic':
      const cosmicMap: Record<number, string> = {
        2: 'Астероид',
        4: 'Луна',
        8: 'Корабль',
        16: 'Планета',
        32: 'Звезда',
        64: 'Черная дыра',
        128: 'Галактика',
        256: 'Инопланетянин',
        512: 'Робот',
        1024: 'Космический корабль',
        2048: 'Черная звезда',
      };
      return cosmicMap[value] || value.toString();

    case 'pixel':
      const pixelMap: Record<number, string> = {
        2: 'Монета',
        4: 'Гриб здоровья',
        8: 'Цветок',
        16: 'Персонаж',
        32: 'Ключ',
        64: 'Щит',
        128: 'Меч',
        256: 'Дракон',
        512: 'Сундук',
        1024: 'Магия',
        2048: 'Король',
      };
      return pixelMap[value] || value.toString();

    default:
      return value.toString();
  }
};