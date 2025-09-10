import React from "react";
import { Link } from "react-router-dom";
const level = true;
const BTStart = ({to}) => {
  return (
    <Link
    to={to}
      className={` mt-5 w-full justify-center inline-flex items-center justify-center] h-[65px] rounded-3xl px-10 bg-[#fff] overflow-hidden shadow-[0_8px_0_#cdf0b4] active:shadow-[0_2px_0_#cdf0b4] active:translate-y-[4px] transition-all duration-100`}
    >
      <p className="font-semibold text-[#58cc02] text-xl">Mulai Dengan Gaya</p>
    </Link>
  );
};

export default BTStart;
