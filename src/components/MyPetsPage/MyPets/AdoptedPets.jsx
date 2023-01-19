import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ModalMyPets from "./ModalMyPets";

const AdoptedPets = () => {
  const [profile, setProfile] = useContext(Context);
  const [petAdopted, setPetAdopted] = useState([]);
  const [petFostered, setPetFostered] = useState([]);
  const [pets, setPets] = useState([]);

  const myId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/userss/${myId}`
        );
        console.log(response);
        setProfile({
          petsAdopted: response.data.pets.adoptedPets,
          petsFostered: response.data.pets.fosteredPets,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchAdoptedData() {
      if (profile.petsAdopted && profile.petsAdopted.length > 0) {
        let adoptedPets = [];
      for (let i = 0; i < profile.petsAdopted.length; i++) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/petss/${profile.petsAdopted[i]}`
          );
          console.log(response);
          setPets(response.data);
          adoptedPets.push({
            adoptionStatus: response.data.adoptionStatus,
            name: response.data.name,
            picture: response.data.picture,
          });
        } catch (error) {
          console.error(error);
        }
      }
      setPetAdopted(adoptedPets);
    }
  }
    fetchAdoptedData();
  }, [profile.petsAdopted]);

  useEffect(() => {
    async function fetchFosteredData() {
      if (profile.petsFostered && profile.petsFostered.length > 0) {
        let fosteredPets = [];
      for (let i = 0; i < profile.petsFostered.length; i++) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/petss/${profile.petsFostered[i]}`
          );
          console.log(response);
          setPets(response.data);
          fosteredPets.push({
            adoptionStatus: response.data.adoptionStatus,
            name: response.data.name,
            picture: response.data.picture,
            id: response.data._id,
            type: response.data.type,
            breed: response.data.breed,
            height: response.data.height,
            weight: response.data.weight,
            color: response.data.color,
            bio: response.data.bio,
            hypoallergenic: response.data.hypoallergenic,
            dietaryRestrictions: response.data.dietaryRestrictions,
            breed: response.data.breed,
          });
        } catch (error) {
          console.error(error);
        }
      }
      setPetFostered(fosteredPets);
    }
  }
    fetchFosteredData();
  }, [profile.petsFostered]);

  return (
    <div className="admin-contain m-3">
      {profile.petsAdopted == 0 ? (
        <h1>You currently do not adopt any pets</h1>
      ) : (
        <div className="adopt-container">
          <h1> Here is all your Adopted Pets :</h1>
          {petAdopted.map((pet, index) => (
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
      {profile.petsFostered == 0 ? (
        <h1>You currently do not foster any pets</h1>
      ) : (
        <div className="adopt-container">
          <h1>Here is all your Fostered Pets :</h1>
          {petFostered.map((pet, index) => (
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

export default AdoptedPets;
