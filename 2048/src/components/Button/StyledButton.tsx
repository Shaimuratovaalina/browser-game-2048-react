import styled, { css } from 'styled-components';

export interface StyledButtonProps {
  disable?: boolean;
  mini?: boolean;
}

const getMiniProps = () => css`
  width: 24px;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  padding: 0;
`;

const StyledButton = styled.button<StyledButtonProps>`
  outline: none;
  border: none;
  padding: 8px 16px;
  line-height: 1.75;
  margin: 0;
  white-space: nowrap;
  ${({ mini }) => mini && getMiniProps};

  /* Основной стиль кнопки */
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: rgb(12, 5, 42); /* Темно-зелёный */
  color: #ffffff;
  cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(19, 15, 32); /* Светло-бирюзовый */
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default StyledButton;