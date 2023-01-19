import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

const Login = ({ setShow }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(Context);
  const [token, setToken] = useContext(Context);
  const [profile, setProfile] = useContext(Context);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/login`, formData)
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          const { token } = response.data;
          setToken(token);
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
          setProfile({
            email: response.data.user.email,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            phoneNumber: response.data.user.phoneNumber,
            id: response.data.user._id,
          });

          localStorage.setItem("userId", response.data.user._id);
          setShow(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const testId = localStorage.getItem("userId");

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          autoFocus
          name="email"
          defaultValue={formData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          autoFocus
          defaultValue={formData.password}
          name="password"
          onChange={handleChange}
        />
      </Form.Group>
      <Button
        disabled={formData.email === "" || formData.password === ""}
        type="submit"
      >
        Log in
      </Button>
    </form>
  );
};

export default Login;
