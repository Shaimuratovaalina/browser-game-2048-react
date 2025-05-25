import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
`;

interface StatsAndAchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatsAndAchievementsModal: React.FC<StatsAndAchievementsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Статистика и достижения</h2>
        <p>Здесь будет отображаться ваша статистика и список достижений.</p>
        <button onClick={onClose}>Закрыть</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StatsAndAchievementsModal;