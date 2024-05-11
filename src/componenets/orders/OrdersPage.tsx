import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import Order from "../../types/order";
import OrderCard from "./OrderCard";
import { DataContext } from "../common/DataContext";
import AddOrderForm from "./AddOrderForm";
import { useNavigate } from "react-router-dom";

interface Props {
  orders: Order[];
}

const OrdersPage = () => {
  const { orders, addOrder, loadingOrders, errorOrders } =
    useContext(DataContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Hook to get the navigate function

  const handleSubmit = async (data: Order) => {
    setIsSubmitting(true);
    addOrder(data);
    setIsSubmitting(false);
    onClose();
  };

  if (loadingOrders) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (errorOrders) {
    return (
      <Text color="red.500" textAlign="center">
        {errorOrders}{" "}
        <span role="img" aria-label="Crying face">
          😢
        </span>
      </Text>
    );
  }

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 1, lg: 2, xl: 2 }}
        padding="10px"
        spacing={10}
        m={10}
      >
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </SimpleGrid>
      <HStack justifyContent="center" padding="10px">
        <Button onClick={onOpen}>Créer une commande</Button>
      </HStack>

      {isSubmitting && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Spinner size="xl" />
        </Box>
      )}

      <AddOrderForm
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default OrdersPage;
