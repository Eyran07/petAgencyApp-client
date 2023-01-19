import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPet from "../AddPet/AddPet";
import Dashboard from "../Dashboard/Dashboard";
import "./Admin.css";
import Button from "react-bootstrap/Button";

const Admin = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false);

  return (
    <div className="admin-contain m-3">
      <h1>Admin</h1>
      <div className="admin">
        <Button variant="secondary"
          className="m-2"
          onClick={() => {
            setShowDashboard(true);
            setShowAddPet(false);
          }}
        >
          Dashboard
        </Button>
        <Button variant="secondary"
          className=""
          onClick={() => {
            setShowDashboard(false);
            setShowAddPet(true);
          }}
        >
          Add Pet
        </Button>
      </div>
      {showAddPet && <AddPet />}
      {showDashboard && <Dashboard />}
    </div>
  );
};

export default Admin;
