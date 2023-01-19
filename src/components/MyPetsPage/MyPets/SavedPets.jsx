import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ModalMyPets from "./ModalMyPets";

const SavedPets = () => {
  const [profile, setProfile] = useContext(Context);
  const [showMessageSavedPets, setShowMessageSavedPets] = useState(false);
  const [showSavedPets, setShowSavedPets] = useState(true);
  const [petSaved, setPetSaved] = useState([]);
  const [pets, setPets] = useState([]);

  const myId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3003/userss/${myId}`
        );
        console.log(response);
        const user = response.data;
        setProfile({
          petsSaved: response.data.pets.savedPets,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    async function fetchSavedData() {
      if (profile.petsSaved && profile.petsSaved.length > 0) {
        let savedPets = [];
        for (let i = 0; i < profile.petsSaved.length; i++) {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_SERVER_URL}/petss/${profile.petsSaved[i]}`
            );
            console.log(response);
            setPets(response.data);
            savedPets.push({
              adoptionStatus: response.data.adoptionStatus,
              name: response.data.name,
              picture: response.data.picture,
              id: response.data._id,
            });
          } catch (error) {
            console.error(error);
          }
        }
        setPetSaved(savedPets);
      }
    }
    fetchSavedData();
  }, [profile.petsSaved]);

  return (
    <div className="admin-contain m-3">
      {profile.petsSaved == 0 ? (
        <h1>You currently do not saved any pets</h1>
      ) : (
        <div className="adopt-container">
          <h1> Here is all your Saved Pets :</h1>
          {petSaved.map((pet, index) => (
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={pet.picture} />
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>{pet.adoptionStatus}</Card.Text>
                <ModalMyPets card={pet} id={pets._id} />
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPets;