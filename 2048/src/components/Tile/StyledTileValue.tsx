// src/components/Tile/StyledTileValue.tsx
import styled from 'styled-components';
import { expand, merge, pop } from '../../utils/animation';
import { getTileColor } from '../../utils/common';

export interface StyledTileValueProps {
  isNew?: boolean;
  isMerging?: boolean;
  value: number;
}

const StyledTileValue = styled.div<StyledTileValueProps>`
  width: 100%;
  height: 100%;
  font-size: inherit;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme, value }) =>
    theme.palette[getTileColor(value)]};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  animation-name: ${({ isMerging, isNew }) =>
    isMerging ? merge : isNew ? expand : pop};
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
  transition: all 0.2s ease;

  color: ${({ theme, value }) =>
    value === 2 ? theme.palette.foreground : theme.palette.primary};

  user-select: none;
  font-weight: bold;
`;

export default StyledTileValue;