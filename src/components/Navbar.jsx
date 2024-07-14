import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import {useAuth } from '../context/AuthContext';
import { auth } from '../config/firebase';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } =useAuth();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async() => {
    try {
       await signOut(auth);
       toast.success('Logout successful');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
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
            <div>
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                onClick={handleMenuToggle}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.photoURL || 'https://i.pravatar.cc/300'}
                  alt=""
                />
              </button>
            </div>
            {menuOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}
              >
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;