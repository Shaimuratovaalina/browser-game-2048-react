import React from 'react';
import styled from 'styled-components';
import ThemeOption from './ThemeOption'; // Убедитесь, что путь правильный

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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Satisfy', cursive;
  line-height: 1.6;
`;

const CloseButton = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color: rgb(42, 25, 96);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: rgb(22, 10, 51);
  }
`;

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeName: string;
  setTheme: (theme: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  themeName,
  setTheme,
}) => {
  if (!isOpen) return null;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '24px' }}>Настройки</h2>
        {/* Выбор темы */}
        <div style={{ marginBottom: '24px' }}>
          <strong>Выберите тему:</strong>
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ThemeOption
              active={themeName === 'default'}
              onClick={() => handleThemeChange('default')}
            >
              Светлая тема
            </ThemeOption>
            
            <ThemeOption
              active={themeName === 'dark'}
              onClick={() => handleThemeChange('dark')}
            >
              Темная тема
            </ThemeOption>
            
            <ThemeOption
              active={themeName === 'retro'}
              onClick={() => handleThemeChange('retro')}
            >
              Ретро тема
            </ThemeOption>
            
            <ThemeOption 
            active={themeName === 'cosmic'} 
            onClick={() => handleThemeChange('cosmic')}
            >
              Космическая тема
              </ThemeOption>
              
              <ThemeOption 
              active={themeName === 'pixel'} 
              onClick={() => handleThemeChange('pixel')}
              >
                Пиксельная тема
                </ThemeOption>
           
            <ThemeOption 
            active={themeName === 'halloween'}
             onClick={() => handleThemeChange('halloween')}
             >
              Хэллоуин
              </ThemeOption>
              
              <ThemeOption 
              active={themeName === 'forest'} 
              onClick={() => handleThemeChange('forest')}
              >
                Лесная
                </ThemeOption>
               
                <ThemeOption 
                active={themeName === 'neon'} 
                onClick={() => handleThemeChange('neon')}
                >
                  Неоновая
                  </ThemeOption>
          </div>
        </div>
        <CloseButton onClick={onClose}>Закрыть</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal;
export type { SettingsModalProps };
