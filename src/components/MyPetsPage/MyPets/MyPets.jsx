import "./MyPets.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import SavedPets from "./SavedPets";
import AdoptedPets from "./AdoptedPets";

const MyPets = () => {
    const [showMyPets, setShowMyPets] = useState(false);
    const [showSavedPets, setShowSavedPets] = useState(false);

  return (
    <div className="admin-contain m-3">
      <h1>List of all your Pets and Saved Pets</h1>
      <div className="admin">
        <Button variant="secondary"
          className="m-2"
          onClick={() => {
            setShowMyPets(true);
            setShowSavedPets(false);
          }}
        >
          My Pets
        </Button>
        <Button variant="secondary"
          className=""
          onClick={() => {
            setShowMyPets(false);
            setShowSavedPets(true);
          }}
        >
            Saved Pets
        </Button>
      </div>
      {showSavedPets && <SavedPets />}
      {showMyPets && <AdoptedPets />}
    </div>
  );
};

export default MyPets;