import React, { useState, useEffect } from 'react';

const FadeTransition = ({ children, isVisible = true, duration = 1000, className = "" }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Wait for fade out animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`transition-opacity duration-${duration} ${className} ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeTransition;
