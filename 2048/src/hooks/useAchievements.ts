import { useState } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  achieved: boolean;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'merge-10', title: 'Начинающий', description: 'Сделайте 10 слияний', target: 10, current: 0, achieved: false },
  { id: 'score-1000', title: 'Любитель', description: 'Наберите 1000 очков', target: 1000, current: 0, achieved: false },
  { id: 'tile-128', title: 'Продвинутый', description: 'Получите плитку 128', target: 128, current: 0, achieved: false },
  { id: 'perfect-game', title: 'Идеальная игра', description: 'Выиграйте за 20 ходов', target: 20, current: 0, achieved: false },
];

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  const checkAchievements = (stats: {
    mergesCount: number;
    score: number;
    bestTile: number;
    moves: number;
    gameStatus: 'win' | 'lose' | 'running';
  }) => {
    setAchievements(prev => prev.map(a => {
      if (a.achieved) return a;

      let current = a.current;
      let achieved = false;

      switch (a.id) {
        case 'merge-10':
          current = stats.mergesCount;
          achieved = current >= a.target;
          break;
        case 'score-1000':
          current = stats.score;
          achieved = current >= a.target;
          break;
        case 'tile-128':
          current = stats.bestTile;
          achieved = current >= a.target;
          break;
        case 'perfect-game':
          if (stats.gameStatus === 'win') {
            current = stats.moves;
            achieved = current <= a.target;
          }
          break;
      }

      return {
        ...a,
        current,
        achieved
      };
    }));
  };

  return { achievements, checkAchievements };
};