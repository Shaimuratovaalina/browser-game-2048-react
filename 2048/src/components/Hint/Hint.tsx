import React from 'react';
import styled from 'styled-components';

// Анимация появления
const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HintContainer = styled.div`
  ${fadeIn}
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  width: 100%;
  animation: fadeIn 0.5s ease-in-out forwards;
`;

interface HintProps {
  message: string;
}

const Hint: React.FC<HintProps> = ({ message }) => (
  <HintContainer>{message}</HintContainer>
);

export default Hint;
