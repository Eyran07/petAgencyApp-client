import "./Navbar.css";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Modals from "../HomePage/Modal/Modals";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn, admin, setAdmin] = useContext(Context);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateSearch = () => {
    navigate("/search");
  };

  const handleNavigateProfile = () => {
    navigate("/profile");
  };

  const handleNavigateAdmin = () => {
    navigate("/admin");
  };

  const handleNavigateMyPets = () => {
    navigate("/mypets");
  };

  const myId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3003/userss/${myId}`
        );
        console.log(response);
        const user = response.data;
        if (response.data.admin === true) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [admin]);

  return (
    <div className="nav-container">
      <Sidebar />
      <button className="btns" onClick={handleNavigateHome}>
        Home
      </button>
      <button className="btns" onClick={handleNavigateSearch}>
        Search
      </button>
      {isLoggedIn ? (
        <button className="btns" onClick={handleNavigateProfile}>
          Profile
        </button>
      ) : null}
      {!admin ? null : (
        <button className="btns" onClick={handleNavigateAdmin}>
          Admin
        </button>
      )}
      {isLoggedIn ? (
        <button className="btns" onClick={handleNavigateMyPets}>
          My Pets
        </button>
      ) : null}
      <Modals />
    </div>
  );
};

export default Navbar;
