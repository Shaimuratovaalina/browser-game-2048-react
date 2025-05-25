import React from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const TimerLabel = styled.span`
  font-size: 14px;
  color: ${props => props.theme.palette.primary};
  text-transform: uppercase;
`;

const TimerValue = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.palette.secondary};
`;

interface TimerProps {
  isActive: boolean;
  time: number;
}

const Timer: React.FC<TimerProps> = ({ isActive, time }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <TimerContainer>
      <TimerLabel>Время</TimerLabel>
      <TimerValue>{isActive ? formatTime(time) : formatTime(time)}</TimerValue>
    </TimerContainer>
  );
};

export default Timer;