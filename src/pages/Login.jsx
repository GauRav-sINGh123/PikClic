import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleGoogleSignUp = async (e) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen  flex flex-col space-y-4 justify-center items-center relative">
      
      <div className="bg-white w-96 shadow-xl border border-gray-400 rounded-md p-5">
        <h1 className="text-3xl text-neutral-800 font-medium text-center">
          Welcome
        </h1>
        <p className="text-sm text-neutral-600 text-center">
          Login to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full h-12 border text-black placeholder:text-gray-600 border-gray-800 bg-slate-200 rounded px-3"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full h-12 border text-black placeholder:text-gray-600 border-gray-800 bg-slate-200 rounded px-3"
            placeholder="Password"
          />
          <div className="">
            <Link to="/signup">
              <p className="font-medium cursor-pointer text-sm text-blue-600 hover:text-blue-800 hover:scale-105 hover:-translate-y-0.5 transition ease-in-out rounded-md p-2">
                Don't have an account?
                <span> Signup</span>
              </p>
            </Link>
          </div>
          <button className="text-center w-full bg-blue-800 rounded-md text-white py-3 font-medium hover:scale-100 hover:-translate-y-0.5 transition ease-in-out">
            Login
          </button>
        </form>
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>
        <button
          onClick={handleGoogleSignUp}
          className="px-4 py-2 w-full bg-blue-900 hover:bg-blue-950 hover:scale-105 transition-all ease-in-out border flex gap-2 border-slate-700 rounded-lg hover:border-slate-500 hover:text-slate-900 hover:shadow"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span className="font-medium ml-14 text-white">
            SignIn with Google
          </span>
        </button>
      </div>
    </div>
  );
}

export default Login;
