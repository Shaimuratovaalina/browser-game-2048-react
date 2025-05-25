import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimeStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalTime: number;
}

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
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 32px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  text-align: left;
`;

const CloseButton = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color:rgb(31, 11, 79);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color:rgb(23, 9, 152);
  }
`;

const StatItem = styled.p`
  margin: 8px 0;
  font-size: 16px;
`;

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const TimeStatsModal: React.FC<TimeStatsModalProps> = ({ isOpen, onClose, totalTime }) => {
  const [stats, setStats] = useState<{
    bestTime: number;
    gamesPlayed: number;
    averageTime: number;
  }>(() => {
    const saved = localStorage.getItem('timeStats');
    return saved
      ? JSON.parse(saved)
      : { bestTime: Infinity, gamesPlayed: 0, averageTime: 0 };
  });

  useEffect(() => {
    if (!isOpen || totalTime <= 0) return;

    const newGamesPlayed = stats.gamesPlayed + 1;
    const newBestTime = Math.min(stats.bestTime, totalTime);
    const totalGameTime = stats.averageTime * stats.gamesPlayed + totalTime;
    const newAverageTime = totalGameTime / newGamesPlayed;

    const newStats = {
      bestTime: newBestTime,
      gamesPlayed: newGamesPlayed,
      averageTime: newAverageTime,
    };

    setStats(newStats);
    localStorage.setItem('timeStats', JSON.stringify(newStats));
  }, [isOpen, totalTime]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Статистика по времени</h2>
        <StatItem>
          <strong>Лучшее время:</strong>{' '}
          {stats.bestTime === Infinity ? 'Нет данных' : formatTime(stats.bestTime)}
        </StatItem>
        <StatItem>
          <strong>Среднее время:</strong>{' '}
          {isNaN(stats.averageTime) ? 'Нет данных' : formatTime(stats.averageTime)}
        </StatItem>
        <StatItem>
          <strong>Игр сыграно:</strong> {stats.gamesPlayed}
        </StatItem>
        <CloseButton onClick={onClose}>Закрыть</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TimeStatsModal;