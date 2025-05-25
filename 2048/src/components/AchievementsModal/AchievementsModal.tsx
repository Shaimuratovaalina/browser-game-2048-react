import React from 'react';
import styled from 'styled-components'; // Для стилизованных компонентов
import Box from '../Box';
import Text from '../Text';

// Интерфейс Achievement (должен быть импортирован или определён здесь)
export interface Achievement {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  achieved: boolean;
}

// Стиль для фона модального окна
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

// Стиль для содержимого модального окна
const ModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 32px;
  border-radius: 12px;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

// Пропсы для компонента
interface AchievementsModalProps {
  achievements: Achievement[]; // Убедитесь, что интерфейс Achievement доступен
  isOpen: boolean;
  onClose: () => void;
}

// Компонент AchievementsModal
const AchievementsModal: React.FC<AchievementsModalProps> = ({ achievements, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '24px' }}>Достижения</h2>
        {achievements.map((achievement) => (
          <Box key={achievement.id} style={{ marginBottom: '16px' }}>
            <Text fontWeight="bold">{achievement.title}</Text>
            <Text>{achievement.description}</Text>
            <Text>
              {achievement.achieved ? '✅ Выполнено' : `${achievement.current}/${achievement.target}`}
            </Text>
          </Box>
        ))}
        <button
          style={{
            marginTop: '24px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          Закрыть
        </button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AchievementsModal;