import React from "react";
import Navbar from "./components/Navbar/Navbar";
import uniconnect from "./uniconnect.jpg";
import { Link } from "react-router-dom";

function AppPage() {
  return (
    <div>
      <Navbar />

      <div className=" flex justify-center  bg-yellow-300 items-center flex-row gap-8 p-4 sm:justify-end">
          <Link
            className="animate-slidedown flex justify-center items-center h-[3rem] w-[9rem] font-[500] text-white bg-red-600 font-poppins text-[1.5rem] p-2  rounded-md"
            to="/register"
          >
            Register
          </Link>

          <Link
            className="animate-slidedownX flex justify-center items-center h-[3rem] w-[9rem] font-[500] text-white bg-red-600 font-poppins text-[1.5rem] p-2  rounded-md"
            to="/login"
          >
            Login
          </Link>
        </div>

      {/* Intro Section */}
      <div className="bg-[#F9F9F9] pb-12">
        <div className="text-[3rem] sm:text-[5rem] h-auto grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-8 sm:gap-8">
          {/* Left Section */}
          <div className="ml-8 px-8 pt-8 h-auto  self-center justify-self-center rounded-2xl  row-span-1 sm:col-span-5 font-poppins text-center ">
            <p className="animate-slidedown">
              A Platform for Sharing News Across University
            </p>
          </div>

          {/* Right Section */}
          <div className=" sm:col-start-6 w-fit h-fit flex sm:col-end-9 row-start-2 sm:row-start-1 self-center justify-self-center">
            <img
              src={uniconnect}
              alt="uniconnect"
              className="w-[20rem] animate-slidedownX  rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Subheading Banner */}

      <div className="text-[1.5rem]  md:text-[2rem] lg:text-[2rem] flex flex-col gap-6 bg-yellow-300   w-full text-center  font-poppins py-4">
        <p className="animate-slidedownY">Hello! Want to connect with your college friends?</p>

        
      </div>
    </div>
  );
}

export default AppPage;
