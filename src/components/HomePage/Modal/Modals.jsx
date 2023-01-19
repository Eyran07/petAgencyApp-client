import "./Modal.css";
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "../Signupform/Signup";
import Login from "../Loginform/Login";
import { Context } from "../../Context/Context";

const Modals = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem('userId');
  };

  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const login = () => {
    // implement login logic her
    setIsLoggedIn(true);
  };

  return (
    <>
      {token ? (
        <button className="btns" variant="primary" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="btns" variant="primary" onClick={handleShow}>
          {isLogin ? "Login" : "Signup"}
        </button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {isLogin ? <Login onLogin={login} setShow={setShow} /> : <Signup />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={toggleForm}>
            {isLogin
              ? "Not signup yet ? Create an account"
              : "Already have an account ? Login"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;