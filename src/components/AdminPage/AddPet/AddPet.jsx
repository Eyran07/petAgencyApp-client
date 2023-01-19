import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

const AddPet = () => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    adoptionStatus: "",
    height: "",
    weight: "",
    color: "",
    bio: "",
    hypoallergenic: "",
    dietaryRestrictions: "",
    breed: "",
  });

  const [image , setImage] = useState("")

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    formDataWithImage.append("image", image);
    axios
      .post("http://localhost:3003/pet", formDataWithImage, {
          headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => {
          console.log(response);
          // Reset the form data and show a success message
          setSubmissionMessage("Pet added successfully!");
      })
      .catch((error) => {
          console.log(error);
          console.error(error);
      });
  };
  

  return (
    <form onSubmit={handleSubmit} className="container-add m-5">
      {/* Display the submission message if it exists */}
      {submissionMessage && (
        <div className="alert alert-success">{submissionMessage}</div>
      )}
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          name="type"
          placeholder="Enter pet type ( dog, cat)"
          defaultValue={formData.type}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter pet name"
          defaultValue={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Adoption Status</Form.Label>
        <Form.Control
          as="select" // Use the as prop to render a select element
          name="adoptionStatus"
          value={formData.adoptionStatus} // Use the value prop instead of defaultValue
          onChange={handleChange}
        >
          <option value="">Select an option</option> // Add a default option
          with an empty value
          <option value="adopted">Adopted</option> // Add options for each
          status
          <option value="fostered">Fostered</option>
          <option value="available">Available</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Picture (URL)</Form.Label>
        <Form.Control
          type="file"
          accept="img/*"
          placeholder="Enter URL to picture"
          onChange={handleImage}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Height</Form.Label>
        <Form.Control
          type="number"
          name="height"
          placeholder="Enter pet height in cm"
          defaultValue={formData.height}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          placeholder="Enter pet weight in kg"
          defaultValue={formData.weight}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Color</Form.Label>
        <Form.Control
          type="text"
          name="color"
          placeholder="Enter pet color"
          defaultValue={formData.color}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          type="textarea"
          name="bio"
          placeholder="Enter a short bio for the pet"
          defaultValue={formData.bio}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Hypoallergenic</Form.Label>
        <Form.Control
          type="textarea"
          name="hypoallergenic"
          defaultValue={formData.hypoallergenic}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Dietary Restrictions</Form.Label>
        <Form.Control
          type="textarea"
          name="dietaryRestrictions"
          defaultValue={formData.dietaryRestrictions}
          // Use the checked prop instead of defaultValue
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Breed</Form.Label>
        <Form.Control
          type="text"
          name="breed"
          placeholder="Enter pet breed (optional)"
          defaultValue={formData.breed}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" className="m-5">
        Submit
      </Button>
    </form>
  );
};

export default AddPet;