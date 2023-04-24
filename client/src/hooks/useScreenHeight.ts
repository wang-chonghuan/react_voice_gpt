import { useState, useEffect } from 'react';

export const useScreenHeight = () => {
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateScreenHeight);

    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);

  return screenHeight;
};
