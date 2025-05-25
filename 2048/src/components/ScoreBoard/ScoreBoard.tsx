import { FC, useEffect, useRef, useState } from 'react';
import Box from '../Box';
import Text from '../Text';
import StyledScore from './StyledScore';

export interface ScoreBoardProps {
  title: string;
  total: number;
}

const ScoreBoard: FC<ScoreBoardProps> = ({ total, title }) => {
  const totalRef = useRef(total);
  const [score, setScore] = useState(() => total - totalRef.current);

  useEffect(() => {
    setScore(total - totalRef.current);
    totalRef.current = total;
  }, [total]);

  return (
    <Box
      marginInline="s2"
      paddingBlock="s3"
      inlineSize="92px"
      background="secondary"
      flexDirection="column"
      position="relative"
      justifyContent="center"
      boxSizing="border-box"
    >
      <Text fontSize={12} textTransform="uppercase" fontWeight="bold" color="tertiary">
        {title}
      </Text>
      {/* Яркий и контрастный цвет текста */}
      <Text color="foreground" fontWeight="bold" fontSize={18}>
        {total}
      </Text>
      {score > 0 && (
        // Применяем анимацию для нового счета
        <StyledScore key={total}>
          <Text fontSize={18} fontWeight="bold" color="foreground">
            +{score}
          </Text>
        </StyledScore>
      )}
    </Box>
  );
};

export default ScoreBoard;