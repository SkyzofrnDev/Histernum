import React, { useState, useEffect } from "react";

const Arrange = ({ question, left, right, correctPairs = {}, onComplete }) => {
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [pairs, setPairs] = useState([]); 
  const [error, setError] = useState(null); // 🔴 simpan index error (left/right)
  const [disabled, setDisabled] = useState(false); // ⏳ disable sementara

  const baseStyle =
    "font-semibold flex items-center justify-between px-5 text-center w-fit gap-5 overflow-hidden active:translate-y-[4px] duration-100 transition-all h-fit p-2 rounded-2xl border-2 cursor-pointer";

  // 🔑 Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return; // ⛔ stop kalau lagi error
      const key = e.key;
      if (["1", "2", "3", "4"].includes(key)) {
        setLeftSelected(Number(key) - 1);
      }
      if (["5", "6", "7", "8"].includes(key)) {
        setRightSelected(Number(key) - 5);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled]);

  // 👉 cek pasangan ketika ada pilihan kiri & kanan
  useEffect(() => {
    if (leftSelected !== null && rightSelected !== null) {
      let valid = true;

      if (Object.keys(correctPairs).length > 0) {
        valid = correctPairs[leftSelected] === rightSelected;
      }

      if (valid) {
        setPairs((prev) => [...prev, { left: leftSelected, right: rightSelected }]);
        setLeftSelected(null);
        setRightSelected(null);
      } else {
        // ❌ salah → tandai merah & disable 2 detik
        setError({ left: leftSelected, right: rightSelected });
        setDisabled(true);

        setTimeout(() => {
          setError(null);
          setDisabled(false);
        }, 2000);

        setLeftSelected(null);
        setRightSelected(null);
      }
    }
  }, [leftSelected, rightSelected, correctPairs]);

  // 👉 kalau semua pasangan sudah terjawab
  useEffect(() => {
    if (pairs.length === left.length && onComplete) {
      onComplete();
    }
  }, [pairs, left.length, onComplete]);

  const isMatched = (side, index) =>
    pairs.some((p) => (side === "left" ? p.left === index : p.right === index));

  return (
    <div className="text-white">
      <p className="font-bold text-2xl mb-10">{question}</p>

      <div className="flex gap-x-20">
        {/* Kiri */}
        <div className="flex flex-col gap-y-4">
          {left.map((item, index) => {
            const isSelected = leftSelected === index;
            const matched = isMatched("left", index);
            const isError = error?.left === index;

            return (
              <div
                key={index}
                onClick={() => !matched && !disabled && setLeftSelected(index)}
                className={`${baseStyle} ${
                  matched
                    ? "bg-[#202f36] border-[#5f8428] text-[#5f8428] w-60 shadow-[0_4px_0_#5f8428] cursor-default"
                    : isError
                    ? "bg-[#202f36] border-red-500 text-red-500 w-60 shadow-[0_4px_0_red]"
                    : isSelected
                    ? "bg-[#202f36] border-[#3f85a7] text-[#1899d6] w-60 shadow-[0_4px_0_#3f85a7]"
                    : `text-[#52656d] border-[#37464f] hover:bg-[#202f36] ${
                        disabled ? "opacity-75 cursor-not-allowed" : ""
                      }`
                }`}
              >
                <div
                  className={`border-2 px-3 py-1 rounded-md ${
                    matched
                      ? "border-[#5f8428] text-[#5f8428]"
                      : isError
                      ? "border-red-500 text-red-500"
                      : isSelected
                      ? "border-[#3f85a7] text-[#1899d6]"
                      : "border-[#37464f]"
                  }`}
                >
                  <p>{index + 1}</p>
                </div>
                <p className="text-2xl">{item}</p>
              </div>
            );
          })}
        </div>

        {/* Kanan */}
        <div className="flex flex-col gap-y-4">
          {right.map((item, index) => {
            const isSelected = rightSelected === index;
            const matched = isMatched("right", index);
            const isError = error?.right === index;

            return (
              <div
                key={index}
                onClick={() => !matched && !disabled && setRightSelected(index)}
                className={`${baseStyle} ${
                  matched
                    ? "bg-[#202f36] border-[#5f8428] text-[#5f8428] w-60 shadow-[0_4px_0_#5f8428] cursor-default"
                    : isError
                    ? "bg-[#202f36] border-red-500 text-red-500 w-60 shadow-[0_4px_0_red]"
                    : isSelected
                    ? "bg-[#202f36] border-[#3f85a7] text-[#1899d6] w-60 shadow-[0_4px_0_#3f85a7]"
                    : `text-[#52656d] border-[#37464f] hover:bg-[#202f36] ${
                        disabled ? "opacity-75 cursor-not-allowed" : ""
                      }`
                }`}
              >
                <div
                  className={`border-2 px-3 py-1 rounded-md ${
                    matched
                      ? "border-[#5f8428] text-[#5f8428]"
                      : isError
                      ? "border-red-500 text-red-500"
                      : isSelected
                      ? "border-[#3f85a7] text-[#1899d6]"
                      : "border-[#37464f]"
                  }`}
                >
                  <p>{index + 5}</p>
                </div>
                <p className="text-2xl">{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Arrange;
