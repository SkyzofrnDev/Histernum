import React from "react";

export const Score = () => {
  return (
    <div>
      <CountUp
        from={0}
        to={100}
        separator=","
        direction="up"
        duration={1}
        className="count-up-text"
      />
    </div>
  );
};
