import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import PrivateRoute from "./routes/PrivateRoute";
import Services from "./components/Services";
import Pricing from "./components/Pricing";

function App() {
  return (
    <div  >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
    
    </div>
  );
}

export default App;
