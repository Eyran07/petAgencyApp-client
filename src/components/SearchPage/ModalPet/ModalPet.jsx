import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const ModalPet = (props) => {
  const {
    name,
    _id,
    picture,
    adoptionStatus,
    type,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
  } = props.card;

  const [submissionMessage, setSubmissionMessage] = useState("");

  const myId = localStorage.getItem("userId");

  const { id } = props;
  const [
    token,
    setToken,
    profile,
    setProfile,
    isLoggedIn,
    setIsLoggedIn,
    isSaved,
    setIsSaved,
  ] = useContext(Context);

  const { handleClick } = props;
  const [show, setShow] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isFostering, setIsFostering] = useState(false);
  const [isAdopted, setIsAdopted] = useState(false);
  const [savedNum, setSavedNum] = useState({ petsSaved: [] });
  const [adoptedNum, setAdoptedNum] = useState({ petsAdopted: [] });
  const [fosteredNum, setFosteredNum] = useState({ petsFostered: [] });
  const [isSaveds, setIsSaveds] = useState(false);
  const [isUnsaved, setIsUnsaved] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [petIds, setPetIds] = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3003/userss/${myId}`
        );
        console.log(response);
        const user = response.data;
        setToken(true);
        setSavedNum({
          petsSaved: response.data.pets.savedPets,
        });
        setAdoptedNum({
          petsAdopted: response.data.pets.adoptedPets,
        });
        setFosteredNum({
          petsFostered: response.data.pets.fosteredPets,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleAdoptOrFoster = (actionType) => {
    axios
      .post(`http://localhost:3003/pets/${id}/adopt`, {
        actionType: actionType,
        userId: myId,
      })
      .then((res) => {
        if (res.data.message === "Pet adopted/fostered successfully.") {
          setIsOwner(true);
          setIsAdopted(false);
          setSubmissionMessage("Pet adopted/fostered successfully!");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        setSubmissionMessage("Pet already adopted/fostered!");
      });
  };

  const handleAdopt = () => {
    handleAdoptOrFoster("adopted");
  };
  const handleFoster = () => {
    handleAdoptOrFoster("foster");
  };

  const handleReturn = () => {
    axios
      .post(`http://localhost:3003/pets/${id}/return`, {
        actionType: "available",
        userId: myId,
      })
      .then((res) => {
        if (res.data.message === "Pet returned successfully.") {
          setIsOwner(false);
          setSubmissionMessage("Pet returned successfully!");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        setSubmissionMessage("Pet already returned!");
      });
  };

  const handleSave = () => {
    axios
      .post(`http://localhost:3003/pets/${id}/save`, {
        userId: myId,
      })
      .then((res) => {
        if (res.data.message === "Pet saved succesfully.") {
          setIsSaved(true);
          setSubmissionMessage("Pet saved succesfully!");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        setSubmissionMessage("Pet already saved!");
      });
  };

  const handleUnsave = () => {
    axios
      .post(`http://localhost:3003/pets/${id}/unsave`, {
        userId: myId,
      })
      .then((res) => {
        if (res.data.message === "Pet unsaved succesfully.") {
          setIsSaved(false);
          setSubmissionMessage("Pet unsaved succesfully!");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        setSubmissionMessage("Pet already unsaved!");
      });
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
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={picture}
            alt={name}
            style={{ width: "29rem", height: "14rem" }}
          />
        </Modal.Body>
        <Modal.Body>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p>
            <strong>Adoption Status:</strong> {adoptionStatus}
          </p>
          <p>
            <strong>Height:</strong> {height} cm
          </p>
          <p>
            <strong>Weight:</strong> {weight} kg
          </p>
          <p>
            <strong>Color:</strong> {color}
          </p>
          <p>
            <strong>Bio:</strong> {bio}
          </p>
          <p>
            <strong>Hypoallergenic:</strong> {hypoallergenic ? "Yes" : "No"}
          </p>
          <p>
            <strong>Dietary Restrictions:</strong> {dietaryRestrictions}
          </p>
          <p>
            <strong>Breed:</strong> {breed}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {token === true &&
          adoptionStatus === "adopted" &&
          !adoptedNum.petsAdopted.includes(_id) &&
          !fosteredNum.petsFostered.includes(
            _id
          ) ? null : adoptedNum.petsAdopted.includes(_id) ||
            fosteredNum.petsFostered.includes(_id) ? (
            <Button variant="danger" onClick={handleReturn}>
              Return to Adoption Center
            </Button>
          ) : token === true ? (
            <>
              <div>
                <Button
                  variant="success"
                  onClick={() => handleAdoptOrFoster("foster")}
                >
                  Foster
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleAdoptOrFoster("adopted")}
                >
                  Adopt
                </Button>
              </div>
            </>
          ) : null}

          {token && savedNum.petsSaved.includes(_id) ? (
            <Button variant="danger" onClick={handleUnsave}>
              Unsave
            </Button>
          ) : token && !savedNum.petsSaved.includes(_id) ? (
            <Button variant="warning" onClick={handleSave}>
              Save
            </Button>
          ) : null}

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalPet;
