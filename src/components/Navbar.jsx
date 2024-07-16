import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

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
    <nav className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="text-2xl font-bold  ">PikClick</p>
            </div>
            <div className="hidden sm:ml-6 sm:block"></div>
          </div>

          <div className="relative ml-3">
            <button
              onClick={handleLogout}
              className="flex rounded-md outline-none bg-blue-600 px-4 py-2 hover:scale-105  text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-900" />
    </nav>
  );
};

export default Navbar;
