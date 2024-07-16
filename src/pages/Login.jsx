import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
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
      navigate("/");
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <div className="h-screen bg-neutral-900 flex flex-col space-y-10 justify-center items-center">
      <div className="bg-white w-96 shadow-xl rounded-md p-5">
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
            className="w-full h-12 border text-black placeholder:text-gray-600 border-gray-800  bg-slate-200 rounded px-3"
            placeholder="Password"
          />
          <div className="">
            <p className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:scale-105  hover:-translate-y-0.5 transition ease-in-out rounded-md p-2">
              Don't have an account?
              <span>
                {" "}
                <Link to="/signup">Signup</Link>
              </span>
            </p>
          </div>
          <button className="text-center w-full bg-blue-800 rounded-md text-white py-3 font-medium hover:scale-100 hover:-translate-y-0.5 transition ease-in-out">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
