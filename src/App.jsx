import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetails from "./pages/ServiceDetails";
import Success from "./pages/Success";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import UserDashboard from "./pages/UserDashboard";
import Setting from "./pages/user/Setting";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/support"
          element={<Login />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/settings"
          element={<Setting />}
        />

        <Route
          path="/service/:slug"
          element={<ServiceDetails />}
        />

        <Route
          path="/success"
          element={<Success />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App; 