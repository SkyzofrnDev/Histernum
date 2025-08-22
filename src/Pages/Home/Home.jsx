import React from "react";
import { Navigation } from "../../Components/Index";
import { Outlet } from "react-router-dom";
import { Information } from "../../Layout/Index";

const Home = () => {
  return (
    <div className="bg-[#131f24] h-fit flex w-full text-white">
      <div className=" w-fit border-r-2 p-7 pt-10 border-[#37464f] sticky top-0 h-screen">
        <Navigation />
      </div>
      <div className="w-2/3">
        <Outlet />
      </div>
      <div className=" w-fit border-l-2 p-7 pt-10 border-[#37464f] sticky h-screen top-0">
        <Information/>
      </div>
    </div>
  );
};

export default Home;
