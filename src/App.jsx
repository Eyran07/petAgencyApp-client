import Navbar from "./components/Navbar/Navbar";
import Home from "./components/HomePage/Home/Home";
import { Route, Routes } from "react-router-dom";
import Search from "./components/SearchPage/Search/Search";
import Profile from "./components/ProfilePage/Profile";
import Admin from "./components/AdminPage/Admin/Admin";
import MyPets from "./components/MyPetsPage/MyPets/MyPets";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "./components/Context/Context";
import axios from "axios";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [criteria, setCriteria] = useState({});
  const [petIds, setPetIds] = useState([]);
  const [profile, setProfile] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    bio: "",
    petsFostered: [],
    petsAdopted: [],
    petsSaved: [],
  });
  const [isSaved, setIsSaved] = useState(false);

  const [showMessageSavedPets, setShowMessageSavedPets] = useState(false);
  const [showSavedPets, setShowSavedPets] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setIsLoggedIn(true);
      setToken(tokenFromStorage);
    }
  }, []);

  return (
    <Context.Provider
      value={[
        isLoggedIn,
        setIsLoggedIn,
        admin, setAdmin,
        token,
        setToken,
        profile,
        setProfile,
        criteria,
        setCriteria,
        petIds,
        setPetIds,
        showMessageSavedPets,
        setShowMessageSavedPets,
        showSavedPets,
        setShowSavedPets,
        isSaved,
        setIsSaved,
      ]}
    >
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          {isLoggedIn && admin && <Route path="/admin" element={<Admin />} />}
          {isLoggedIn && <Route path="/mypets" element={<MyPets />} />}
        </Routes>
      </div>
    </Context.Provider>
  );
};

export default App;
