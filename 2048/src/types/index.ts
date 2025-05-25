export type Vector = { r: number; c: number };
export type Cell = Tile | undefined;
export interface Tile {
  id: number;
  r: number;
  c: number;
  value: number;
  isNew?: boolean;
  isMerged?: boolean;
}

export interface Tile {
  //id: string;
  index: number;
  r: number;
  c: number;
  value: number;

  isMerging: boolean;
  canMerge: boolean;
  isMerged?: boolean;
}