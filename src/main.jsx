import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <AuthProvider>
    <BrowserRouter>
     <Navbar /> 
      <App />
      <Toaster position="bottom-right" richColors />
     
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
