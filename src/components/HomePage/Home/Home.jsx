import "./Home.css";
import { Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import HomeMessage from "./HomeMessage";
import WelcomeMessage from "../WelcomeMessage/Message"

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(Context);

  return (
    <div className="container">
        {isLoggedIn ? (<WelcomeMessage />) : (<HomeMessage />) }
    </div>
  );
};

export default Home;