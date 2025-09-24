import React from "react";
import { Link } from "react-router-dom";

const CardLearn = ({ title, description, source, imgSrc, link }) => {
  return (
    <Link
      to={link}
      className="gap-5 flex border-2 border-[#37464f] w-full p-5 rounded-xl hover:shadow-lg transition-shadow"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-1/3 h-76 rounded-3xl object-cover"
      />
      <div className="h-full justify-between flex flex-col">
        <p className="text-2xl font-semibold">{title}</p>
        <p className="text-lg mt-2">{description}</p>
        <p className="text-lg mt-2">Source Video: {source}</p>
      </div>
    </Link>
  );
};

export default CardLearn;
