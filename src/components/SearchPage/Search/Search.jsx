import "./Search.css";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import Card from "react-bootstrap/Card";
import ModalPet from "../ModalPet/ModalPet";

const Search = () => {
  const [filter, setFilter] = useState({
    adoptionStatus: "all",
    type: "all",
    name: "",
    minHeight: 1,
    minWeight: 1,
    maxHeight: 200,
    maxWeight: 200,
  });
  const [pets, setPets] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setShowCard(true);
  };

  useEffect(() => {
    // Fetch your pets based on the current filter state
    if(filter.adoptionStatus === "all") {
        filter.adoptionStatus = ""
    }
    if(filter.type === "all") {
        filter.type = ""
    }
    if(filter.maxWeight === 200) {
        filter.maxWeight = ""
    }
    if(filter.maxHeight === 200) {
        filter.maxHeight = ""
    }
    if(filter.minWeight === 1) {
        filter.minWeight = ""
    }
    if(filter.minHeight === 1) {
        filter.minHeight = ""
    }
    axios.get(`${process.env.REACT_APP_SERVER_URL}/pet`, {params: filter})
      .then((response) => {
        setPets(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);
  
  const [showBasicSearch, setShowBasicSearch] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]:
        event.target.name === "minHeight" ||
        event.target.name === "maxHeight" ||
        event.target.name === "minWeight" ||
        event.target.name === "maxWeight"
          ? Number(event.target.value)
          : event.target.value,
    });
  };

  return (
    <div className="container-form">
      <h1>Search for a pet</h1>
      <div className="high-container">
        <div className="back">
          <Button
            className="btns-search m-2"
            onClick={() => {
              setShowBasicSearch(true);
              setShowAdvancedSearch(false);
            }}
          >
            Basic Search
          </Button>
          <Button
            className="btns-search m-2"
            onClick={() => {
              setShowBasicSearch(false);
              setShowAdvancedSearch(true);
            }}
          >
            Advanced Search
          </Button>
        </div>
        {showBasicSearch && (
          <form>
            <Form.Select
              name="type"
              onChange={handleChange}
              defaultValue={filter.type}
              aria-label="Default select example"
            >
              <option>Choose a pet</option>
              <option>All</option>
              <option>Dog</option>
              <option>Cat</option>
            </Form.Select>
          </form>
        )}
        {showAdvancedSearch && (
          <>
            <Form.Select
              name="type"
              onChange={handleChange}
              defaultValue={filter.type}
              aria-label="Default select example"
            >
              <option>Choose a pet</option>
              <option>All</option>
              <option>Dog</option>
              <option>Cat</option>
            </Form.Select>
            <Form.Select
              name="adoptionStatus"
              onChange={handleChange}
              defaultValue={filter.adoptionStatus}
              aria-label="Default select example"
            >
              <option>Choose a Pet Status</option>
              <option>All</option>
              <option>adopted</option>
              <option>fostered</option>
              <option>available</option>
            </Form.Select>
            <input
              placeholder="Name"
              className="weight"
              name="name"
              defaultValue={filter.name}
              onChange={handleChange}
            />
            <div className="footer">
              <div className="column">
                <input
                  placeholder="MinHeight in CM"
                  className="weight"
                  name="minHeight"
                  min={1}
                  max={200}
                  defaultChecked={filter.minHeight}
                  onChange={handleChange}
                />
                <input
                  placeholder="Min Weight in CM"
                  className="weight"
                  name="minWeight"
                  min={1}
                  max={200}
                  defaultChecked={filter.minWeight}
                  onChange={handleChange}
                />
              </div>
              <div className="column">
                <input
                  placeholder="Max Height in CM"
                  className="weight"
                  name="maxHeight"
                  min={1}
                  max={100}
                  defaultChecked={filter.maxHeight}
                  onChange={handleChange}
                />
                <input
                  placeholder="Max Weight in CM"
                  className="weight"
                  name="maxWeight"
                  min={1}
                  max={100}
                  defaultChecked={filter.maxWeight}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}
      </div>{" "}
      <Button onClick={handleClick} className="mb-4">
        Search
      </Button>
      <div style={{ display: showCard ? "block" : "none" }}>
        {pets.map((pet, index) => (
          <Card key={index}>
            <Card.Img
              variant="top"
              src={pet.picture}
              style={{ width: "30rem", height: "18rem" }}
            />
            <Card.Body>
              <Card.Title>{pet.name}</Card.Title>
              <ModalPet card={pet} id={pet._id} />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Search;