import React from 'react';
import styled from 'styled-components';

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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Satisfy', cursive;
  line-height: 1.6;
`;

const CloseButton = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color:rgb(22, 145, 193);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color:rgb(10, 107, 32);
  }
`;

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Об авторе</h2>
        <p>
          Это игра 2048 была разработана с использованием современных технологий: React, TypeScript и styled-components.
        </p>
        <p>
          Цель проекта — создать красивую и удобную версию классической игры 2048, добавив дополнительные функции и улучшенный интерфейс.
        </p>
        <p>
          Автор: Шаймуратова Алина.
        </p>
        
        <CloseButton onClick={onClose}>Закрыть</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AboutModal;