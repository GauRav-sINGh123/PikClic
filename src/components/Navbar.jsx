import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { FcGallery } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <nav className="bg-white border-gray-200 py-2.5">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="" className="w-10 h-10" />
          <p className="text-xl font-bold  ">PikClick</p>
        </div>
        <div className="flex items-center lg:order-2">
          {user ? (
            <div className="flex gap-4 sm:gap-10 justify-center items-center">
              <div>
                <Link to={"/gallery"}>
                  {" "}
                  <FcGallery className="w-8 h-8 hover:scale-105 transition-all ease-in-out  " />
                </Link>
              </div>
              <div>
                <AiOutlineLogout
                  className="w-6 h-6 text-slate-800 cursor-pointer hover:scale-105 transition-all ease-in-out hover:text-blue-600 font-bold"
                  onClick={handleLogout}
                />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="hover:scale-105 text-lg  font-medium transition-all bg-blue-700 py-[0.3rem] rounded-md text-white ease-in-out px-6">
                Login
              </button>
            </Link>
          )}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 ${menuOpen ? "hidden" : "block"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${menuOpen ? "block" : "hidden"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
            menuOpen ? "block" : "hidden"
          }`}
          id="mobile-menu-2"
        >
          <div className="flex flex-col justify-center items-center ml-4 gap-2 md:gap-0 mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <Link to={"/"}>
              <p className="font-bold text-gray-600 text-md hover:scale-105 transition-all ease-in-out cursor-pointer hover:text-blue-600">
                Home
              </p>
            </Link>
            <Link to={"/pricing"}>
              <p className="font-bold text-gray-600 text-md hover:scale-105 transition-all ease-in-out cursor-pointer hover:text-blue-600">
                Pricing
              </p>
            </Link>
            <Link to={"/contact"}>
            <p className="font-bold text-gray-600 text-md hover:scale-105 transition-all ease-in-out cursor-pointer hover:text-blue-600">
              Contact
            </p>
            </Link>
            <Link to="/services">
              <p className="font-bold text-gray-600 text-md hover:scale-105 transition-all ease-in-out cursor-pointer hover:text-blue-600">
                Services
              </p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
