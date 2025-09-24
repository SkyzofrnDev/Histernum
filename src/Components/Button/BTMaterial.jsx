import React from "react";
import { Link } from "react-router-dom";

const BTMaterial = () => {
  return (
    <Link to={"/lesson"} className="px-2 flex gap-5 py-3 rounded-xl transition-all duration-100 border-[#4aab02] border-2 shadow-[0_4px_0_#4aab02] active:shadow-[0_2px_0_#4aab02] active:translate-y-[4px]">
      <img src="/Icons/book-ol.svg" alt="icon-buku" loading="lazy" />
      <p className="font-semibold">Lihat Materi</p>
    </Link>
  );
};

export default BTMaterial;
