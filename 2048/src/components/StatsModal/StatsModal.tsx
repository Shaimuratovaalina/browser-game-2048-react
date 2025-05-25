import React from 'react';
import styled from 'styled-components';
import useLocalStorage from '../../hooks/useLocalStorage';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StatLabel = styled.span`
  font-weight: bold;
`;

const StatValue = styled.span``;

const StartButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 16px;
`;

const ResetButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
`;

const StatsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [stats, setStats] = useLocalStorage<{ bestScore: number; gamesPlayed: number; totalScore: number }>(
    'stats',
    { bestScore: 0, gamesPlayed: 0, totalScore: 0 }
  );

  const handleResetStats = () => {
    setStats({ bestScore: 0, gamesPlayed: 0, totalScore: 0 });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '24px' }}>Статистика</h2>
        <StatRow>
          <StatLabel>Лучший счет:</StatLabel>
          <StatValue>{stats.bestScore}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Общий счет:</StatLabel>
          <StatValue>{stats.totalScore}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Максимальная плитка:</StatLabel>
          <StatValue>256</StatValue> {/* Здесь можно добавить логику для максимальной плитки */}
        </StatRow>
        <StatRow>
          <StatLabel>Игр достигнуто:</StatLabel>
          <StatValue>{stats.gamesPlayed}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Наименьшее время:</StatLabel>
          <StatValue>0:53</StatValue> {/* Здесь можно добавить логику для времени */}
        </StatRow>
        <StatRow>
          <StatLabel>Минимальное количество ходов:</StatLabel>
          <StatValue>83</StatValue> {/* Здесь можно добавить логику для ходов */}
        </StatRow>
        <StartButton>Начать здесь</StartButton>
        <ResetButton onClick={handleResetStats}>Сбросить статистику</ResetButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StatsModal;