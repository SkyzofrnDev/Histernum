import { useEffect, useRef, useState } from "react";
import MultipleChoice from "./MultipleChoice";
import InputQuestion from "./Input";
import ImageChoice from "./ImageChoice";
import ArrangeQuestion from "./Arrange";
import BTAnswer from "../Button/BTAnswer";
import { Link } from "react-router-dom";
import ProgressBar from "progressbar.js";

const Questions = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null); 
  const [progress, setProgress] = useState(0.50); // 👉 variabel progress (0.0 - 1.0)

  useEffect(() => {
    // simpan instance ke ref
    barRef.current = new ProgressBar.Line(containerRef.current, {
      strokeWidth: 2,
      easing: "easeInOut",
      duration: 1400,
      color: "#93d333",
      trailColor: "#37464f",
      trailWidth: 2,
      svgStyle: { width: "100%", height: "100%" },
    });

    // 👉 kasih linecap jadi rounded
    barRef.current.path.setAttribute("stroke-linecap", "round");
    barRef.current.trail.setAttribute("stroke-linecap", "round");

    // Set progress awal
    barRef.current.animate(progress);

    return () => {
      barRef.current.destroy();
    };
  }, []);

  // Update kalau state progress berubah
  useEffect(() => {
    if (barRef.current) {
      barRef.current.animate(progress);
    }
  }, [progress]);

  return (
    <div className="w-full select-none h-screen flex flex-col bg-[#131f24] py-5 justify-between">
      <div className="flex items-center justify-center gap-10 text-[#ed4140] font-semibold text-2xl px-36 w-full py-10">
        <Link to={"/"}>
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/df223d5b9feb8017b323ed21103eb5ac.svg"
            alt="X"
            loading="lazy"
          />
        </Link>
        <div ref={containerRef} className="w-1/2 h-4 rounded-full overflow-hidden" />
        <div className="flex items-center">
          <img
            src="/Icons/heart.svg"
            alt="icon-heart"
            loading="lazy"
            className="w-10"
          />
          <p className="mt-1">5</p>
        </div>
      </div>
      <div className="flex items-baseline justify-center">
        <MultipleChoice />
      </div>
      <div className="border-t-2 border-[#37464f] py-10 ">
        <div className="flex justify-end px-20">
          <BTAnswer />
        </div>
      </div>
    </div>
  );
};

export default Questions;
