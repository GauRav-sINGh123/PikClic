import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState } from "react";
import useStorage from "../hooks/useStorage";  // Import the useStorage hook

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { startUpload, url } = useStorage();  // Destructure the hook's return value
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }

    setIsButtonDisabled(!validateEmail(newEmail) || password.length < 6);
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6) {
      setPasswordError("Password is too short");
    } else {
      setPasswordError("");
    }

    setIsButtonDisabled(!validateEmail(email) || newPassword.length < 6);
  };

  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (avatar) {
        startUpload(avatar, true);  // Start uploading the avatar
      }

      navigate("/gallery");
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen   flex-1 flex flex-col space-y-10 justify-center items-center">
      <div className="bg-white  border border-slate-400 w-96 shadow-xl rounded p-5">
        <h1 className="text-3xl text-neutral-800 font-medium text-center">
          Welcome
        </h1>
        <p className="text-sm text-neutral-600 text-center">
          Create A New Account
        </p>
        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          <input
            onChange={handleChangeEmail}
            value={email}
            type="email"
            className="w-full h-12 border text-black placeholder:text-gray-600 border-gray-800 bg-slate-200 rounded px-3"
            placeholder="Email"
          />
          {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
          <input
            onChange={handleChangePassword}
            value={password}
            type="password"
            className="w-full h-12 border text-black placeholder:text-gray-600 border-gray-800 bg-slate-200 rounded px-3"
            placeholder="Password"
          />
          {passwordError && (
            <p className="text-red-600 text-sm">{passwordError}</p>
          )}
          <input
            type="file"
            onChange={handleChangeAvatar}
            className="w-full h-12 text-black placeholder:text-gray-600 border-gray-800 bg-slate-200 rounded px-3 py-2"
            accept="image/*"
          />
          <div>
            <Link to="/login">
              <p className="font-medium cursor-pointer text-sm text-blue-600 hover:text-blue-800 hover:scale-105 hover:-translate-y-0.5 transition ease-in-out rounded-md p-2">
                Have an account?
                <span> Login</span>
              </p>
            </Link>
          </div>
          <button
            type="submit"
            className={`text-center w-full bg-blue-800 rounded-md text-white py-3 font-medium hover:scale-100 hover:-translate-y-0.5 transition ease-in-out ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isButtonDisabled}
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
