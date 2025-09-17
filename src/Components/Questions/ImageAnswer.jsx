import React, { useState, useEffect, useRef } from "react";

const ImageAnswer = ({ question }) => {
  const [isSelected, setSelected] = useState(null);
  const containerRef = useRef(null);

  const baseStyle =
    "font-semibold flex items-center px-5 text-center gap-5 overflow-hidden shadow-[0_4px_0_#37464f] active:shadow-[0_1px_0_#37464f] active:translate-y-[4px] duration-100 transition-all h-fit p-2 rounded-2xl border-2 cursor-pointer";

  // Auto focus biar langsung bisa keyboard
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelected((prev) =>
        prev === null ? 0 : (prev + 1) % question.options.length
      );
    }
    if (e.key === "ArrowUp") {
      setSelected((prev) =>
        prev === null
          ? question.options.length - 1
          : (prev - 1 + question.options.length) % question.options.length
      );
    }
    if (/^[1-9]$/.test(e.key)) {
      const num = parseInt(e.key, 10) - 1;
      if (num < question.options.length) {
        setSelected(num);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-2/4 justify-between flex flex-col outline-none"
    >
      <p className="font-bold text-3xl">{question.prompt}</p>

      <div className="flex mt-10 gap-10">
        <img
          src={question.src}
          className="rounded-xl w-52 aspect-square object-cover"
          alt="image-question"
          loading="lazy"
        />
        <p className="font-medium text-xl">{question.desc}</p>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-10 w-full">
        {question.options.map((opt, index) => (
          <div
            key={opt.id}
            onClick={() => setSelected(index)}
            className={`${baseStyle} ${
              isSelected === index
                ? "bg-[#202f36] border-[#3f85a7] text-[#1899d6] shadow-[0_4px_0_#3f85a7]"
                : "text-[#52656d] border-[#37464f] hover:bg-[#202f36]"
            }`}
          >
            <div
              className={`border-2 px-3 py-1 rounded-md ${
                isSelected === index
                  ? "border-[#3f85a7] text-[#1899d6] shadow-[0_4px_0_#3f85a7]"
                  : "border-[#37464f]"
              }`}
            >
              <p>{index + 1}</p>
            </div>
            <p className="text-2xl">{opt.ans}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageAnswer;