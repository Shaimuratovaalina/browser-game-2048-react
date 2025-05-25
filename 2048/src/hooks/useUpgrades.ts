// src/hooks/useUpgrades.ts

import { useState } from 'react';

// Интерфейс для улучшений
export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
}

// Функция для управления улучшениями
export const useUpgrades = (total: number, setTotal: (newScore: number) => void) => {
  // Состояние для хранения улучшений
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: 'spawn-rate',
      name: 'Шанс появления 4',
      description: 'Увеличивает шанс появления плитки 4',
      cost: 500,
      level: 1,
    },
    {
      id: 'undo',
      name: 'Отмена хода',
      description: 'Увеличивает количество доступных отмен ходов',
      cost: 1000,
      level: 1,
    },
    // ... другие улучшения
  ]);

  // Функция для покупки улучшений
  const purchaseUpgrade = (id: string) => {
    setUpgrades((prev) =>
      prev.map((upgrade) => {
        if (upgrade.id === id && total >= upgrade.cost) {
          setTotal(total - upgrade.cost); // Вычитаем стоимость улучшения из текущего счета
          return { ...upgrade, level: upgrade.level + 1 }; // Увеличиваем уровень улучшения
        }
        return upgrade;
      })
    );
  };

  return { upgrades, purchaseUpgrade };
};