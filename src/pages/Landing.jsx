import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Landing() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black">
      <header className="flex justify-between items-center py-4 px-8">
        <div className="text-xl font-bold">PikClick</div>
        <nav className="hidden md:flex space-x-8">
          <Link to={user ? "/home" : "/login"}>
            <p className="px-1 py-2  cursor-pointer hover:scale-110 text-white rounded  transition-all ease-in-out">
              Home
            </p>
          </Link>
          <Link to={"/login"}>
            <p className="px-6 py-2 bg-cyan-700 hover:bg-cyan-800 hover:scale-110 text-white cursor-pointer rounded transition-all ease-in-out">
              Login
            </p>
          </Link>
        </nav>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </header>

      {isMenuOpen && (
        <nav className="md:hidden  bg-slate-900 bg-opacity-30  flex-1 flex flex-col items-center justify-center  shadow-lg py-2">
          <Link to={user ? "/home" : "/login"}>
            <p className="block px-4 py-2 text-white cursor-pointer">Home</p>
          </Link>

          <Link to={"/login"}>
            <p className="block px-4 py-2 text-white bg-cyan-600 rounded-md cursor-pointer mb-4 mt-2  hover:text-blue-700 transition-all ease-in-out">
              Login
            </p>
          </Link>
        </nav>
      )}

      <main className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left py-[50px] px-8 lg:px-20">
        <div className="lg:w-1/2">
          <div className="text-gray-800">
            <h1 className="text-5xl font-bold text-white mt-20 leading-[3.5rem]">
              "Securely Store and Share Your Memories"
            </h1>
            <p className="text-lg  text-gray-300 mt-4">
              "Cloud Storage for Easy Access and Safe Keeping of Your Photos"
            </p>
            <Link to={"/signup"}>
              <p className="relative inline-flex items-center justify-center mt-6 p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-violet-800 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Get Started
                </span>
                <span className="relative invisible">Get Started</span>
              </p>
            </Link>
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
    </div>
  );
}

export default Landing;
