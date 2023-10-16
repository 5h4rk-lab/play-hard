import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update the window size
    function updateWindowSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Attach the event listener
    window.addEventListener('resize', updateWindowSize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return [windowSize.width, windowSize.height];
}

export default useWindowSize;
