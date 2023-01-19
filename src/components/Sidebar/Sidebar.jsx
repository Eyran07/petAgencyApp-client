import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  faHouse,
  faSearch,
  faUser,
  faLock,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../Context/Context";
import { useContext } from "react";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn, admin, setAdmin] = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

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

  return (
    <div className="cont">
      <FaBars onClick={handleShow} />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <div className="container">
            <button className="btn" onClick={handleNavigateHome}>
              <FontAwesomeIcon icon={faHouse} className="ml-5" />
            </button>
            <button className="btn" onClick={handleNavigateSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {isLoggedIn ? (
              <button className="btn" onClick={handleNavigateProfile}>
                <FontAwesomeIcon icon={faUser} />
              </button>
            ) : null}
            {!admin ? null: (
              <button className="btn" onClick={handleNavigateAdmin}>
                <FontAwesomeIcon icon={faLock} />
              </button>
            )}

            {isLoggedIn ? (
              <button className="btn" onClick={handleNavigateMyPets}>
                <FontAwesomeIcon icon={faPaw} />
              </button>
            ) : null}
          </div>
        </Offcanvas.Header>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
