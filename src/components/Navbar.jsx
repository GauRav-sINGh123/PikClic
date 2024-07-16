import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { auth } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
 
  const {user}=useAuth();
  const navigate=useNavigate();
 console.log(user);
  const handleLogout = async() => {
    try {
       await signOut(auth);
       toast.success('Logout successful');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <nav className="bg-inherit">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className='text-2xl font-bold  '>PikClick</p>
            </div>
            <div className="hidden sm:ml-6 sm:block"></div>
          </div>
           <div className="relative ml-3">
           {user ? (
              <button
                onClick={handleLogout}
                className="flex rounded-md outline-none bg-blue-600 px-4 py-2 hover:scale-105  text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all ease-in-out"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex rounded-md outline-none bg-blue-600 px-4 py-2 hover:scale-105  text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all ease-in-out"
               
              >
                Login
              </button>
            )}
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;