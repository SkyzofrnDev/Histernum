import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FadeTransition from './FadeTransition';

const RouteTransition = ({ children, duration = 1000 }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    // Start fade out
    setIsVisible(false);
    
    // After fade out completes, update children and fade in
    const timer = setTimeout(() => {
      setCurrentChildren(children);
      setIsVisible(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [location.pathname, children, duration]);

  return (
    <FadeTransition isVisible={isVisible} duration={duration}>
      {currentChildren}
    </FadeTransition>
  );
};

export default RouteTransition;
