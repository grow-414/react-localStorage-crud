import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import EditForm from "./components/EditForm";

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
        <Route path="/editform" element={<EditForm />} />
      </Routes>
    </Router>
  );
};

export default Routers;
