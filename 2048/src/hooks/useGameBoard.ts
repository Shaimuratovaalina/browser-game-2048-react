import { useCallback, useRef, useState } from 'react';
import {
  clamp,
  create2DArray,
  createIndexArray,
  getId,
  nextTileIndex,
  resetTileIndex,
  shuffle,
} from '../utils/common';
import { Vector } from '../utils/types';
import type { GameState } from './useGameState';
import useLazyRef from './useLazyRef';

export interface Location {
  r: number;
  c: number;
}

export interface Tile extends Location {
  id: string;
  index: number;
  value: number;
  isNew: boolean;
  isMerging: boolean;
  canMerge: boolean;
  isMerged?: boolean; // Для отслеживания объединений
}

export type Cell = Tile | undefined;

export type GameBoardParams = {
  rows: number;
  cols: number;
  gameState: GameState;
  addScore: (score: number) => void;
};

const createNewTile = (r: number, c: number): Tile => {
  const index = nextTileIndex();
  const id = getId(index);
  return {
    index,
    id,
    r,
    c,
    value: Math.random() > 0.9 ? 4 : 2,
    isNew: true,
    isMerging: false,
    canMerge: false,
  };
};

const getEmptyCellsLocation = (grid: Cell[][]) =>
  grid.flatMap((row, r) =>
    row.flatMap<Location>((cell, c) => (cell == null ? { r, c } : [])),
  );

const createNewTilesInEmptyCells = (
  emptyCells: Location[],
  tilesNumber: number,
) => {
  const actualTilesNumber =
    emptyCells.length < tilesNumber ? emptyCells.length : tilesNumber;

  if (!actualTilesNumber) return [];

  return shuffle(emptyCells)
    .slice(0, actualTilesNumber)
    .map(({ r, c }) => createNewTile(r, c));
};

const createTraversalMap = (rows: number, cols: number, dir: Vector) => {
  const rowsMap = createIndexArray(rows);
  const colsMap = createIndexArray(cols);
  return {
    rows: dir.r > 0 ? [...rowsMap].reverse() : rowsMap,
    cols: dir.c > 0 ? [...colsMap].reverse() : colsMap,
  };
};

const sortTiles = (tiles: Tile[]) =>
  [...tiles].sort((t1, t2) => t1.index - t2.index);

// ************************************ Исправленная функция: добавляет максимум 1 плитку за ход
  const mergeAndCreateNewTiles = (grid: Cell[][]) => {
  const rows = grid.length;
  const cols = grid[0].length;

  let score = 0;
  const newGrid = grid.map(row => row.map(tile => tile));
  const tiles: Tile[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = newGrid[r][c];
      if (tile != null) {
        const { canMerge, value, index, ...rest } = tile;
        const newValue = canMerge ? 2 * value : value;
        const mergedTile = {
          ...rest,
          index,
          value: newValue,
          isNew: false,
          isMerging: canMerge,
          canMerge: false,
        };

        tiles.push(mergedTile);
        if (canMerge) {
          score += newValue;
        }

        newGrid[r][c] = mergedTile;
      }
    }
  }

  const emptyCells = getEmptyCellsLocation(newGrid);

  const maxNewTilesPerMove = 1;
  const actualTilesNumber =
    emptyCells.length < maxNewTilesPerMove ? emptyCells.length : maxNewTilesPerMove;

  const newTiles = createNewTilesInEmptyCells(emptyCells, actualTilesNumber);

  newTiles.forEach(tile => {
    newGrid[tile.r][tile.c] = tile;
    tiles.push(tile);
  });

  return {
    grid: newGrid,
    tiles,
    score,
  };
};
//****************************************************************************************** */
const moveInDirection = (grid: Cell[][], dir: Vector) => {
  const newGrid = grid.slice();
  const totalRows = newGrid.length;
  const totalCols = newGrid[0].length;
  const tiles: Tile[] = [];
  const moveStack: number[] = [];

  const traversal = createTraversalMap(totalRows, totalCols, dir);
  traversal.rows.forEach((row) => {
    traversal.cols.forEach((col) => {
      const tile = newGrid[row][col];
      if (tile != null) {
        const pos = {
          currRow: row,
          currCol: col,
          nextRow: clamp(row + dir.r, 0, totalRows - 1),
          nextCol: clamp(col + dir.c, 0, totalCols - 1),
        };

        while (
          pos.nextRow !== pos.currRow ||
          pos.nextCol !== pos.currCol
        ) {
          const { nextRow, nextCol } = pos;
          const nextTile = newGrid[nextRow]?.[nextCol];

          if (nextTile != null) {
            if (
              nextTile.value === tile.value &&
              !nextTile.canMerge &&
              !tile.isMerging
            ) {
              pos.currRow = nextRow;
              pos.currCol = nextCol;
              break;
            } else {
              break;
            }
          }

          pos.currRow = nextRow;
          pos.currCol = nextCol;
          pos.nextRow = clamp(pos.currRow + dir.r, 0, totalRows - 1);
          pos.nextCol = clamp(pos.currCol + dir.c, 0, totalCols - 1);
        }

        const { currRow, currCol } = pos;
        const currentTile = newGrid[currRow][currCol];

        if (currRow !== tile.r || currCol !== tile.c) {
          const updatedTile = {
            ...tile,
            r: currRow,
            c: currCol,
            canMerge: currentTile?.value === tile.value,
            isNew: false,
            isMerging: false,
          };
          newGrid[currRow][currCol] = updatedTile;
          newGrid[tile.r][tile.c] = undefined;
          tiles.push(updatedTile);
          moveStack.push(updatedTile.index);
        } else if (currentTile != null) {
          tiles.push({
            ...currentTile,
            isNew: false,
            isMerging: false,
          });
        }
      }
    });
  });

  return {
    tiles,
    grid: newGrid,
    moveStack,
  };
};

const createInitialTiles = (grid: Cell[][]) => {
  const emptyCells = getEmptyCellsLocation(grid);
  const rows = grid.length;
  const cols = grid[0].length;
  return createNewTilesInEmptyCells(emptyCells, Math.ceil((rows * cols) / 8));
};

const resetGameBoard = (rows: number, cols: number) => {
  resetTileIndex();
  const grid = create2DArray<Cell>(rows, cols);
  const newTiles = createInitialTiles(grid);

  newTiles.forEach((tile) => {
    grid[tile.r][tile.c] = tile;
  });

  return {
    grid,
    tiles: newTiles,
  };
};

const useGameBoard = ({ rows, cols, gameState, addScore }: GameBoardParams) => {
  const [history, setHistory] = useState<{ tiles: Tile[]; grid: Cell[][] }[]>([]);
  const gridMapRef = useLazyRef(() => {
    const grid = create2DArray<Cell>(rows, cols);
    const initialTiles = createInitialTiles(grid);
    initialTiles.forEach((tile) => {
      grid[tile.r][tile.c] = tile;
    });

    return { grid, tiles: initialTiles };
  });

  const [tiles, setTiles] = useState<Tile[]>(gridMapRef.current.tiles);
  const pendingStackRef = useRef<number[]>([]);
  const pauseRef = useRef(gameState.pause);
  // src/hooks/useGameBoard.ts (обновлённая часть)
//***************************************************************************************** */
  const [isMoving, setIsMoving] = useState(false);
  const onMove = useCallback((dir: Vector) => {
  if (!isMoving && !pauseRef.current) {
    setIsMoving(true);

    const {
      tiles: newTiles,
      moveStack,
      grid,
    } = moveInDirection(gridMapRef.current.grid, dir);

    gridMapRef.current = { grid, tiles: newTiles };
    pendingStackRef.current = moveStack;
    setHistory((prev) => [
      { grid: gridMapRef.current.grid, tiles },
      ...prev,
    ]);

    if (moveStack.length > 0) {
      setTiles(sortTiles(newTiles));
    }

    // Отключаем isMoving после завершения анимации
    setTimeout(() => {
      setIsMoving(false);
    }, 350); // ~ 350ms — время анимации + немного времени для стабилизации
  }
}, [gridMapRef]);
//************************************************************************************************* */
const onMovePending = useCallback(() => {
  pendingStackRef.current.pop();

  if (pendingStackRef.current.length === 0) {
    const {
      tiles: newTiles,
      score,
      grid,
    } = mergeAndCreateNewTiles(gridMapRef.current.grid);
    gridMapRef.current = { grid, tiles: newTiles };
    pendingStackRef.current = newTiles
      .filter((tile) => tile.isMerging || tile.isNew)
      .map((tile) => tile.index);
    setTiles(sortTiles(newTiles));
    addScore(score);
  }
}, [addScore, gridMapRef]);

  

  const onMergePending = useCallback(() => {
    pendingStackRef.current.pop();
  }, []);

  const undoMove = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[0];
    setHistory(history.slice(1));
    gridMapRef.current = { grid: previous.grid, tiles: previous.tiles };
    setTiles(previous.tiles);
    pendingStackRef.current = [];
  }, [history]);

  if (pauseRef.current !== gameState.pause) {
    pauseRef.current = gameState.pause;
  }

  if (gameState.status === 'restart') {
    const { grid, tiles: newTiles } = resetGameBoard(rows, cols);
    gridMapRef.current = { grid, tiles: newTiles };
    pendingStackRef.current = [];
    setTiles(newTiles);
    setHistory([]); // Очищаем историю при рестарте
  }

  return {
    tiles,
    grid: gridMapRef.current.grid,
    onMove,
    onMovePending,
    onMergePending,
    undoMove,
  };
};

export default useGameBoard;