import React from "react";
import { Link, NavLink } from "react-router-dom";

const dataNav = [
  {
    to: "/",
    icon: "Home",
    name: "Pelajaran",
  },
  {
    to: "/lesson",
    icon: "shield",
    name: "Belajar",
  },
  {
    to: "/login",
    icon: "time",
    name: "Belajar",
  },
];

const Navigation = () => {
  return (
    <div className="text-white flex flex-col">
      <Link to={"/"}>
        <p className="FH text-3xl text-[#58cc02] pb-10 select-none">historium</p>
      </Link>
      {dataNav.map((item, i) => (
        <NavLink
          to={item.to}
          end
          className={({ isActive }) =>
            `p-2 rounded-2xl mt-10 flex items-center gap-3 select-none ${
              isActive
                ? "bg-[#202f36] border-2 border-[#42AAFF] w-60 text-[#42AAFF]"
                : "hover:bg-[#202f36] "
            }`
          }
        >
          <img
            src={`/Icons/${item.icon}.svg`}
            alt="Icon-Home"
            loading="lazy"
            className="w-12"
          />
          <p className="font-medium text-xl">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
