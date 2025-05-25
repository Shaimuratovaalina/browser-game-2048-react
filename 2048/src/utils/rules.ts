// src/utils/rules.ts

import type { Cell, Tile } from '../hooks/useGameBoard';
import { DIRECTION_MAP } from './constants';

/**
 * Проверяет, есть ли на поле плитка 2048
 */
export const isWin = (tiles: Tile[]): boolean => {
  return tiles.some(tile => tile.value === 2048);
};

/**
 * Проверяет, возможно ли сделать ход в указанном направлении
 */
const canMoveInDirection = (
  grid: Cell[][],
  tiles: Tile[],
  dir: { r: number; c: number },
  totalRows: number,
  totalCols: number
): boolean => {
  for (let i = 0; i < tiles.length; i++) {
    const { r, c, value, isMerged } = tiles[i];

    const newR = r + dir.r;
    const newC = c + dir.c;

    // Если новая позиция вне поля — пропускаем
    if (newR < 0 || newR >= totalRows || newC < 0 || newC >= totalCols) continue;

    const targetCell = grid[newR][newC];

    // Если ячейка пуста → можно двигаться
    if (!targetCell) {
      return true;
    }

    // Если значение совпадает и ещё не было объединения → можно объединить
    if (
      targetCell.value === value &&
      !targetCell.isMerged &&
      !isMerged
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Проверяет, можно ли продолжать игру:
 * - Есть свободные ячейки
 * - Или есть возможные объединения
 */
export const canGameContinue = (grid: Cell[][], tiles: Tile[]): boolean => {
  const totalRows = grid.length;
  const totalCols = grid[0].length;

  // Если есть хотя бы одна пустая ячейка → можно продолжать
  if (tiles.length < totalRows * totalCols) {
    return true;
  }

  // Проверяем возможность движения во всех направлениях
  const directions = Object.values(DIRECTION_MAP);

  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    if (canMoveInDirection(grid, tiles, direction, totalRows, totalCols)) {
      return true;
    }
  }

  // Нет возможных ходов
  return false;
};