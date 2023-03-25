import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

const Routers = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute Component={<HomePage />} isLoggedIn={isLoggedIn} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default Routers;
