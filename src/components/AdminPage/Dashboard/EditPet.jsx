import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const EditPet = (props) => {
  const {
    name,
    image,
    adoptionStatus,
    type,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
    _id,
  } = props.card;

  const petId = props.card._id;
  console.log(petId);

  const [submissionMessage, setSubmissionMessage] = useState("");

  const myId = localStorage.getItem("userId");

  const { id } = props;
  const [token, setToken, profile, setProfile, isLoggedIn, setIsLoggedIn] =
    useContext(Context);

  const { handleClick } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const [picture, setPicture] = useState("");

  const handleImage = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/pet/${petId}`,
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
              <strong>Name:</strong>
              <input
                type="text"
                name="name"
                defaultValue={name}
                onChange={handleChange}
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="contain-modal">
          <div>
            <strong>Image:</strong>
            <input
              type="file"
              accept="img/*"
              name="image"
              defaultValue={image}
              placeholder="Enter URL to picture"
              onChange={handleImage}
            />
          </div>

          <div>
            <strong>Type:</strong>
            <input
              type="text"
              name="type"
              defaultValue={type}
              onChange={handleChange}
            />
          </div>
          <div>
            <strong>Height:</strong>
            <input
              type="number"
              name="height"
              defaultValue={height}
              onChange={handleChange}
            />
          </div>
          <div>
            <strong>Weight:</strong>
            <input
              type="number"
              name="weight"
              defaultValue={weight}
              onChange={handleChange}
            />
          </div>
          <div>
            <strong>Color:</strong>
            <input
              type="text"
              name="color"
              defaultValue={color}
              onChange={handleChange}
            />
          </div>
          <div>
            <strong>Bio:</strong>
            <input
              type="text"
              name="bio"
              defaultValue={bio}
              onChange={handleChange}
            />
          </div>
          <div>
            <strong>Hypoallergenic:</strong>
            <input
              type="text"
              name="hypoallergenic"
              defaultValue={hypoallergenic}
              onChange={handleChange}
            />
          </div>
          <div>
            <strong>Dietary Restrictions:</strong>
            <input
              type="text"
              name="dietaryRestrictions"
              defaultValue={dietaryRestrictions}
              onChange={handleChange}
            />
          </div>
          <div>
            <strong>Breed:</strong>
            <input
              type="text"
              name="breed"
              defaultValue={breed}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPet;