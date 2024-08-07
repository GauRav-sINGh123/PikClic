import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Hero() {
  const { user } = useAuth();

  return (
    <div className="landing min-h-screen ">
      <main className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left py-[50px] px-8 lg:px-20">
        <div className="lg:w-1/2">
          <div className="  flex flex-col">
            <h1 className="text-5xl  font-extrabold font-DMSans text-neutral-900 mt-8 md:mt-24 leading-[3.3rem] md:leading-[3.5rem]">
              "Store, Manage, and Share Your Photos Safely
              <span className="bg-gradient-to-r  from-pink-600 to-violet-900 text-transparent bg-clip-text  ">
                {" "}
                in the Cloud"
              </span>
            </h1>
            <p className="text-lg font-DMSans  text-gray-600 mt-4">
              "Cloud Storage for Easy Access and Safe Keeping of Your Photos"
            </p>
            <div className="flex justify-center lg:justify-normal">
              <Link to={"/signup"}>
                <p className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none mt-5 hover:scale-105   ease-in-out">
                  Get Started
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12 lg:mt-0 lg:ml-8">
          <img
            src="https://images.unsplash.com/photo-1597250861267-429663f244a8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Experience 1"
            className="col-span-1 lg:col-span-2 h-80 w-full object-cover rounded-lg mx-auto"
          />
          <img
            src="https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Experience 2"
            className="h-80 w-full object-cover rounded-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1625834509314-3b12c6153624?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Experience 3"
            className="h-80 w-full object-cover rounded-lg"
          />
        </div>
      </main>
      <footer className="footer text-neutral-content items-center mt-9 p-4"></footer>
    </div>
  );
}

export default Hero;
