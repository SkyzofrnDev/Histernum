import React, { useState, useEffect } from 'react';
import { heartSystem } from '../../Utils/heartSystem';

const Heart = () => {
  const [hearts, setHearts] = useState(heartSystem.getHearts());
  const [timeUntilNext, setTimeUntilNext] = useState(heartSystem.formatTimeUntilNextHeart());
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Update hearts dan timer setiap detik
  useEffect(() => {
    const updateHearts = () => {
      const currentHearts = heartSystem.getHearts();
      const timeString = heartSystem.formatTimeUntilNextHeart();
      
      setHearts(currentHearts);
      setTimeUntilNext(timeString);
      
      // Check if hearts are regenerating
      setIsRegenerating(currentHearts < heartSystem.getMaxHearts() && timeString !== null);
    };

    // Update immediately
    updateHearts();

    // Update every second
    const interval = setInterval(updateHearts, 1000);

    return () => clearInterval(interval);
  }, []);

  const maxHearts = heartSystem.getMaxHearts();

  return (
    <div className="flex items-center gap-2">
      {/* Hearts Display */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxHearts }, (_, index) => (
          <img
            key={index}
            src="/Icons/heart.svg"
            alt="heart"
            className={`w-8 h-8 ${
              index < hearts 
                ? 'opacity-100' 
                : 'opacity-30 grayscale'
            }`}
          />
        ))}
      </div>
      
      {/* Heart Count */}
      <span className="text-white font-semibold text-lg">
        {hearts}/{maxHearts}
      </span>

      {/* Timer untuk regeneration */}
      {isRegenerating && timeUntilNext && (
        <div className="flex items-center gap-1 ml-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-sm font-medium">
            {timeUntilNext}
          </span>
        </div>
      )}
    </div>
  );
};

export default Heart;
