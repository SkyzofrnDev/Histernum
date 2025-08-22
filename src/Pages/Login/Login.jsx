import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-[#caa35e] h-screen  w-full px-5 text-white flex flex-col justify-center items-center">
      <div className="flex justify-between w-full h-full">
        <img src="/" alt="icon-x" loading="lazy" />
        <Link to={"/register"}> Regiter</Link>
      </div>
      <div className="text-center w-1/3">
        <p className="text-3xl font-semibold">Log In</p>
        <div className="flex text-[#37464f] items-center gap-5 ">
          <div className="w-full h-0.5 bg-[#37464f] rounded-full"></div>
          <p className="font-semibold ">OR</p>
          <div className="w-full h-0.5 bg-[#37464f] rounded-full"></div>
        </div>
        <div className="">
          <p>
            By signing in to Duolingo, you agree to our Terms and Privacy
            Policy.
          </p>
          <p>
            This site is protected by reCAPTCHA Enterprise and the Google
            Privacy Policy and Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
