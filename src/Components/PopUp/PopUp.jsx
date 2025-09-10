import React from "react";
import BTStart from "../Button/BTStart";

const PopUp = ({ title, desc, to }) => {
  return (
    <div className="bg-[#58cc02] p-5 pb-10 text-white w-fit rounded-xl flex flex-col justify-center">
      <p className="font-bold text-xl mb-2">{title}</p>
      <p>{desc}</p>
      <BTStart to={to} />
    </div>
  );
};

export default PopUp;
