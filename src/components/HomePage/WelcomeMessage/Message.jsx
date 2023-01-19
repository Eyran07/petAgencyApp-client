import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Message = () => {

  const[user, setUser] = useState({
    firstName: "",
    lastName: "",
  });
  const myId = localStorage.getItem("userId");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/userss/${myId}`);
        console.log(response);
        const user = response.data;
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          admin: response.data.admin,
        });
        if (user.admin === true) {
          setAdmin(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <h1>
      Welcome back, {user.firstName} {user.lastName}!
    </h1>
  );
};

export default Message;