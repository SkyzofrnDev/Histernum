import React, { useState, useEffect } from "react";

const Arrange = () => {
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);

  // 👉 kiri hanya 4 opsi
  const leftOptions = ["PERIKSA 1", "PERIKSA 2", "PERIKSA 3", "PERIKSA 4"];
  // 👉 kanan juga 4 opsi
  const rightOptions = ["PERIKSA A", "PERIKSA B", "PERIKSA C", "PERIKSA D"];

  const baseStyle =
    "font-semibold flex items-center justify-between px-5 text-center w-fit gap-5 overflow-hidden shadow-[0_4px_0_#37464f] active:shadow-[0_1px_0_#37464f] active:translate-y-[4px] duration-100 transition-all h-fit p-2 rounded-2xl border-2 cursor-pointer";

  // 🔑 Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      // Kolom kiri: angka 1-4
      if (["1", "2", "3", "4"].includes(key)) {
        setLeftSelected(Number(key) - 1);
      }

      // Kolom kanan: angka 5-8
      if (["5", "6", "7", "8"].includes(key)) {
        setRightSelected(Number(key) - 5); // 5 → index 0, 6 → 1, dst
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="text-white">
      <p className="font-bold text-2xl mb-10">Pilih pasangan yang cocok</p>

      <div className="flex gap-x-20">
        {/* Kiri */}
        <div className="flex flex-col gap-y-4">
          {leftOptions.map((item, index) => {
            const isSelected = leftSelected === index;
            return (
              <div
                key={index}
                onClick={() => setLeftSelected(index)}
                className={`${baseStyle} ${
                  isSelected
                    ? "bg-[#202f36] border-[#3f85a7] text-[#1899d6] w-60 shadow-[0_4px_0_#3f85a7] active:shadow-[0_1px_0_#3f85a7]"
                    : "text-[#52656d] border-[#37464f] hover:bg-[#202f36]"
                }`}
              >
                <div
                  className={`border-2 px-3 py-1 rounded-md ${
                    isSelected ? "border-[#3f85a7] text-[#1899d6] " : "border-[#37464f]"
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
          {rightOptions.map((item, index) => {
            const isSelected = rightSelected === index;
            return (
              <div
                key={index}
                onClick={() => setRightSelected(index)}
                className={`${baseStyle} ${
                  isSelected
                    ? "bg-[#202f36] border-[#3f85a7] text-[#1899d6] w-60"
                    : "text-[#52656d] border-[#37464f] hover:bg-[#202f36]"
                }`}
              >
                <div
                  className={`border-2 px-3 py-1 rounded-md ${
                    isSelected ? "border-[#3f85a7] text-[#1899d6]" : "border-[#37464f]"
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
