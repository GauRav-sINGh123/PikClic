import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import PrivateRoute from "./routes/PrivateRoute";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function App() {
  return (
    <div  >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/gallery"
            element={
              <PrivateRoute>
                <Gallery/>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    
    </div>
  );
}

export default App;
