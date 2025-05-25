import React from 'react';
import styled from 'styled-components';

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
  font-family: 'Satisfy', cursive;
  line-height: 1.6;
  text-align: left;
`;

// Стиль для кнопки закрытия
const CloseButton = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color: rgb(99, 101, 102);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: rgb(20, 20, 20);
  }
`;

interface AboutGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutGameModal: React.FC<AboutGameModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>О разработке игры</h2>
        <p>
          Девятнадцатилетний Габриэле Чирулли создал игру за одни выходные в качестве теста,
          чтобы проверить, сможет ли он запрограммировать игру с нуля. «Это был способ скоротать
          время», — сказал он. Он описал ее как «концептуально похожую» на недавно выпущенную
          iOS-игру Threes, и клон другой игры, 1024. Разработанная Veewo Studio, 1024 сама по себе
          является клоном Threes, а ее описание в App Store однажды гласило «нет необходимости
          платить за Threes». В README к 2048 Чирулли ссылается на влияние другого клона 1024:
          одноимённой, но немного отличающейся по механике игры 2048 от Saming.
        </p>
        <p>
          Чирулли был удивлен, когда его проект в выходные получил более 4 миллионов посетителей
          менее чем за неделю. Игра является бесплатной, Чирулли сказал, что не хочет зарабатывать
          деньги «на концепции, которую он не изобретал». В мае 2014 года он выпустил порты для iOS
          и Android.
        </p>
        <CloseButton onClick={onClose}>Закрыть</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AboutGameModal;