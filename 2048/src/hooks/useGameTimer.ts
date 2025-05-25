import { useEffect, useState } from 'react';

const useGameTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false); // Останавливаем таймер, когда время истекло
    }

    // Функция очистки (cleanup function)
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsRunning(false);
  };

  return { timeLeft, startTimer, resetTimer, isRunning };
};

export default useGameTimer;