import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../Context/Context";
import { useNavigate, Navigate } from "react-router-dom";

const Signup = () => {
  const [token, setToken] = useContext(Context);
  const [profile, setProfile, isLoggedIn, setIsLoggedIn] = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [showSuccess, setShowSuccess] = useState(false); // add state to show success message

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
      .post("http://localhost:3003/users", formData)
      .then((response) => {
        console.log(response);
        setShowSuccess(true); // set showSuccess to true
      })
      .catch((error) => {
        console.log(error);
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
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
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            autoFocus
            name="password"
            defaultValue={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            autoFocus
            defaultValue={formData.confirmPassword}
            name="confirmPassword" // change name to confirmPassword
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            autoFocus
            name="firstName"
            defaultValue={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            autoFocus
            name="lastName"
            defaultValue={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            autoFocus
            name="phoneNumber"
            defaultValue={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          disabled={
            formData.confirmPassword === "" ||
            formData.confirmPassword !== formData.password ||
            formData.firstName === "" ||
            formData.lastName === "" ||
            formData.email === "" ||
            formData.password === ""
          } // add check for empty confirm password field
          type="submit"
        >
          Sign Up
        </Button>
      </form>
      {showSuccess && <div>Account created, please log in</div>}{" "}
      {/* show success message */}
    </>
  );
};

export default Signup;
