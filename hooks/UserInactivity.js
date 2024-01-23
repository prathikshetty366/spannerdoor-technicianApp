import { useEffect, useState } from 'react';

const useUserInactivity = (timeout = 300000) => {
  // Timeout duration in milliseconds (default: 5 minutes)
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {
    let inactivityTimeout;

    const resetTimeout = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => setIsInactive(true), timeout);
    };

    const handleUserActivity = () => {
      if (isInactive) {
        setIsInactive(false);
      }
      resetTimeout();
    };

    // Setting up event listeners
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);

    // Setting initial timeout
    resetTimeout();

    // Clear timeout and remove event listeners on component unmount
    return () => {
      clearTimeout(inactivityTimeout);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
    };
  }, [timeout, isInactive]);

  return isInactive;
};

export default useUserInactivity;
