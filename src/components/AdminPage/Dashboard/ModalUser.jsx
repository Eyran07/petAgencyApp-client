import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useEffect } from "react";

const ModalUser = (props) => {
  const { firstName, lastName, email, phoneNumber, admin } = props.card;
  const userId = props.card._id;

  const [submissionMessage, setSubmissionMessage] = useState("");
  const [adminStatus, setAdminStatus] = useState(admin);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [petUser, setPetUser] = useState([]);

  const [profile, setProfile] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    admin: adminStatus,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/user/${userId}`,
        profile
      );
      console.log(response);
      setSubmissionMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setSubmissionMessage(
        "An error occurred while updating your profile. Please try again later."
      );
    }
  };
  
  const handleAddAdmin = async (event) => {
    event.preventDefault();
    try {
      setAdminStatus(true);
      setProfile({
        ...profile,
        admin: true,
      });
    } catch (error) {
      console.error(error);
      setSubmissionMessage(
        "An error occurred while updating your profile. Please try again later."
      );
    }
  };

  const handleRemoveAdmin = async (event) => {
    event.preventDefault();
    try {
      setAdminStatus(true);
      setProfile({
        ...profile,
        admin: false,
      });
    } catch (error) {
      console.error(error);
      setSubmissionMessage(
        "An error occurred while updating your profile. Please try again later."
      );
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        See More
      </Button>
      <Modal show={show} onHide={handleClose}>
        {/* Display the submission message if it exists */}
        {submissionMessage && (
          <div className="alert alert-success">{submissionMessage}</div>
        )}
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <strong>First Name:</strong>
              <input
                type="text"
                name="firstName"
                defaultValue={firstName}
                onChange={handleChange}
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="contain-modal">
          <div>
            <strong>Phone Number:</strong>
            <input
              type="text
"
              name="lastName"
              defaultValue={phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <strong>Email:</strong>
            <input
              type="text"
              name="email"
              defaultValue={email}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {admin ? (
            <Button variant="danger" onClick={handleRemoveAdmin}>
              Remove Admin
            </Button>
          ) : (
            <Button variant="success" onClick={handleAddAdmin}>
              Add Admin
            </Button>
          )}
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>{" "}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
