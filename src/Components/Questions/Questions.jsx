import { useState } from "react";
import MultipleChoice from "./MultipleChoice";
import InputQuestion from "./Input";
import ImageChoice from "./ImageChoice";
import ArrangeQuestion from "./Arrange";
import BTAnswer from "../Button/BTAnswer";
import { Link } from "react-router-dom";

const Questions = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-[#131f24]">
      <div className="flex items-center  gap-4 text-[#ed4140] font-semibold just text-2xl">
        <Link to={"/"}>
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/df223d5b9feb8017b323ed21103eb5ac.svg"
            alt="X"
            loading="lazy"
          />
        </Link>
        <img
          src="/Icons/heart.svg"
          alt="icon-heart"
          loading="lazy"
          className="w-10"
        />
        <p className="mt-1 ">5</p>
      </div>
      <div></div>
      <div className="border-t-2 border-[#37464f] py-10">
        <BTAnswer />
      </div>
    </div>
  );
};

export default Questions;
