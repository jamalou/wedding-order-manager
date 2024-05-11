import { Button, HStack, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
const Navigation = () => {
  const location = useLocation(); // This hook allows us to get the current route path

  const isOrders = location.pathname === "/orders";
  const isProducts = location.pathname === "/products";

  return (
    <HStack justifyContent="start" padding="10px">
      <Image src={logo} boxSize="50px"></Image>
      <Link to="/orders">
        <Button
          variant="link"
          fontSize="xl"
          onClick={() => console.log("commandes")}
        >
          Commandes
        </Button>
      </Link>
      <Link to="/products">
        <Button
          variant="link"
          fontSize="xl"
          onClick={() => console.log("produits")}
        >
          Produits
        </Button>
      </Link>
    </HStack>
  );
};
export default Navigation;
