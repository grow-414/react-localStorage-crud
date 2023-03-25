import React from "react";
import NavBar from "../components/NavBar";
import UsersList from "../components/lists/UsersList";

const HomePage = () => {
  return (
    <div className="home-page">
        <NavBar />
        <UsersList />
    </div>
  );
};

export default HomePage;
