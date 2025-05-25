import React, { useState } from 'react';
import styled from 'styled-components';

// === Стили ===

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
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Satisfy', cursive;
  line-height: 1.6;
  text-align: left;
`;

const CloseButton = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color: rgb(71, 76, 78);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: rgb(4, 10, 6);
  }
`;

const NavButton = styled(CloseButton)`
  margin-left: 10px;
`;

// === Типы ===

interface Step {
  title: string;
  content: JSX.Element;
}

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// === Компонент ===

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  // Функция генерации SVG (с сеткой и несколькими плитками)
  const generateSVGGrid = (
    tilesData: Array<{ x: number; y: number; value: number; bgColor: string; textColor: string }>
  ): string => {
    let rects = '';
    let texts = '';

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const tile = tilesData.find(t => t.x === j * 90 && t.y === i * 90);
        const value = tile ? tile.value : '';
        const bg = tile ? tile.bgColor : '#cdc1b4';
        const color = tile ? tile.textColor : '#cdc1b4';

        rects += `<rect x='${j * 90}' y='${i * 90}' width='80' height='80' rx='8' ry='8' fill='${bg}'/>`;
        if (value) {
          texts += `<text x='${j * 90 + 40}' y='${i * 90 + 45}' font-size='20' fill='${color}'>${value}</text>`;
        }
      }
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
        ${rects}
        ${texts}
        <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze"/>
      </svg>
    `;
  };

  // Генерация картинок для каждого шага
  const step1Tiles = [
    { x: 0, y: 0, value: 2, bgColor: '#eee4da', textColor: '#776e65' },
    { x: 90, y: 0, value: 4, bgColor: '#ede0c8', textColor: '#776e65' },
  ];
  const svgStep1 = generateSVGGrid(step1Tiles);

  const step2Tiles = [
    { x: 0, y: 0, value: 2, bgColor: '#eee4da', textColor: '#776e65' },
    { x: 90, y: 0, value: 2, bgColor: '#ede0c8', textColor: '#776e65' },
  ];
  const svgStep2 = generateSVGGrid(step2Tiles);

  const step3Tiles = [
    { x: 0, y: 0, value: 2, bgColor: '#eee4da', textColor: '#776e65' },
    { x: 90, y: 0, value: 2, bgColor: '#ede0c8', textColor: '#776e65' },
    { x: 0, y: 90, value: 4, bgColor: '#f2b179', textColor: '#fff' },
  ];
  const svgStep3 = generateSVGGrid(step3Tiles);

  const step4Tiles = [
    { x: 0, y: 0, value: 1024, bgColor: '#edcf72', textColor: '#fff' },
    { x: 90, y: 0, value: 512, bgColor: '#edcc61', textColor: '#fff' },
    { x: 0, y: 90, value: 256, bgColor: '#edc850', textColor: '#fff' },
    { x: 90, y: 90, value: 128, bgColor: '#edc22e', textColor: '#fff' },
  ];
  const svgStep4 = generateSVGGrid(step4Tiles);

  // Шаги обучения
  const steps: Step[] = [
    {
      title: 'Шаг 1: Что такое плитка',
      content: (
        <>
          <p>Плитки — это элементы игры с числами. Изначально на поле две плитки со значением 2.</p>
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStep1)}`}
            alt="Шаг 1"
            style={{ width: '100%', marginTop: '16px' }}
          />
        </>
      ),
    },
    {
      title: 'Шаг 2: Как двигать',
      content: (
        <>
          <p>Используйте стрелки клавиатуры или свайпы, чтобы перемещать плитки.</p>
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStep2)}`}
            alt="Шаг 2"
            style={{ width: '100%', marginTop: '16px' }}
          />
        </>
      ),
    },
    {
      title: 'Шаг 3: Как объединять',
      content: (
        <>
          <p>Когда две одинаковые плитки сталкиваются, они объединяются в одну с удвоенным значением.</p>
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStep3)}`}
            alt="Шаг 3"
            style={{ width: '100%', marginTop: '16px' }}
          />
        </>
      ),
    },
    {
      title: 'Шаг 4: Стратегия сборки 2048',
      content: (
        <>
          <p>Чтобы собрать 2048, держите самые большие плитки в одном углу и избегайте хаотичного перемешивания.</p>
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStep4)}`}
            alt="Шаг 4"
            style={{ width: '100%', marginTop: '16px' }}
          />
        </>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{steps[currentStep].title}</h2>
        {steps[currentStep].content}
        <div style={{ marginTop: '24px' }}>
          {currentStep > 0 && <NavButton onClick={handleBack}>Назад</NavButton>}
          <NavButton onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Закрыть' : 'Далее'}
          </NavButton>
          <NavButton onClick={onClose} style={{ marginLeft: '10px', backgroundColor: '#999' }}>
            Пропустить
          </NavButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HowToPlayModal;