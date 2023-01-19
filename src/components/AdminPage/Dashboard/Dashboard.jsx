import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ModalPet from "../../SearchPage/ModalPet/ModalPet";
import Button from "react-bootstrap/Button";
import ModalUser from "./ModalUser"
import EditPet from "./EditPet";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [currentData, setCurrentData] = useState("users"); // "users" or "pets"
  const classes = useStyles();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
        setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchPets() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pet`);
        setPets(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
    fetchPets();
  }, []);

    return (
      <div className="m-5">
        <h3>Here is the list of all Users and Pets:</h3>
        <div className="d-flex justify-content-between mb-3">
          <Button
            variant="secondary"
            color="primary"
            onClick={() => setCurrentData("users")}
          >
            Users
          </Button>
          <Button
            variant="secondary"
            color="primary"
            onClick={() => setCurrentData("pets")}
          >
            Pets
          </Button>
        </div>
        <TableContainer component={Paper} className="mt-5">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {currentData === "users" ? (
                  <>
                    <TableCell>First Name</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Breed</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData === "users"
                ? users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {user.firstName}
                      </TableCell>
                      <TableCell align="right">{user.lastName}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">
                        <ModalUser card={user}/>
                      </TableCell>
                    </TableRow>
                  ))
                : pets.map((pet) => (
                    <TableRow key={pet._id}>
                      <TableCell component="th" scope="row">
                        {pet.name}
                      </TableCell>
                      <TableCell align="right">{pet.type}</TableCell>
                      <TableCell align="right">{pet.breed}</TableCell>
                      <TableCell align="right">
                        <EditPet card={pet} />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

export default Dashboard;