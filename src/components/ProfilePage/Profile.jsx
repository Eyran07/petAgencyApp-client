import "./Profile.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useContext } from "react";
import { Context } from "../Context/Context";

const Profile = () => {

  const [profile, setProfile] = useContext(Context);
  const [userDetails, setUserDetails] = useState({});
  const myId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3003/userss/${myId}`);
        console.log(response);
        const user = response.data;
        setProfile({
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
          id: response.data._id,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(`http://localhost:3003/user/${myId}`, profile);
        console.log(response);
        setSubmissionMessage("Profile updated successfully!");
    } catch (error) {
        console.error(error);
        setSubmissionMessage("An error occurred while updating your profile. Please try again later.");
    }
};

  return (
    <div className="container-form">
      {/* Display the submission message if it exists */}
            {submissionMessage && (
        <div className="alert alert-success">{submissionMessage}</div>
      )}
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className="container-forms">
        <label htmlFor="email">Email adress</label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={profile.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={profile.firstName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={profile.lastName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          defaultValue={profile.phoneNumber}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          defaultValue={profile.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          id="bio"
          defaultValue={profile.bio}
          onChange={handleChange}
        />
        <br />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default Profile;