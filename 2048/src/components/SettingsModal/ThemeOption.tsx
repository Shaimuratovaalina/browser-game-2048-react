import React from 'react';
import styled from 'styled-components';

interface ThemeOptionProps {
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode; // Добавьте свойство children
}

const StyledThemeOption = styled.button<ThemeOptionProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  margin: 8px;
  border-radius: 8px;
  border: 2px solid ${({ active }) => (active ? '#ec9050' : '#ddd')};
  background-color: ${({ active }) => (active ? '#ec9050' : '#f9f9f9')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    border-color: rgb(25, 10, 63);
    background-color: #ffe0c0;
  }
`;

const ThemeOption: React.FC<ThemeOptionProps> = ({ active, onClick, children }) => {
  return (
    <StyledThemeOption active={active} onClick={onClick}>
      {children}
    </StyledThemeOption>
  );
};

export default ThemeOption;