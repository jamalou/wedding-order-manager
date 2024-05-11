import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import OrderItem from "../../types/orderItem";
import OrderItemsPanel from "./OrderItemsPanel";
import OrderFullCard from "./OrderFullCard";
import { DataContext } from "../common/DataContext";
import AddItemForm from "../items/AddItemForm";
import Order from "../../types/order";

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // Get the order ID from URL parameters
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModify,
    onOpen: onOpenModify,
    onClose: onCloseModify,
  } = useDisclosure();
  const {
    products,
    fetchOrders,
    orders,
    addOrderItem,
    deleteOrderItem,
    loadingItems,
    deleteOrder,
    exportOrder,
  } = useContext(DataContext);
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (orders.length === 0) fetchOrders();
    fetchOrderById(orderId);
  }, [orderId]); // Fetch order details when orderId changes

  const fetchOrderById = async (orderId: string | undefined) => {
    setLoading(true);
    const filterOrder = orders.find((order) => order.id === orderId);
    if (filterOrder) {
      setOrder(filterOrder);
      setOrderItems(filterOrder.order_items);
      setLoading(false);
      return;
    }
    setError("Commande introuvable");
  };

  if (loading) {
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

  if (error) {
    return (
      <Text color="red.500" textAlign="center">
        {error}{" "}
        <span role="img" aria-label="Crying face">
          😢
        </span>
      </Text>
    );
  }

  if (!order) {
    return (
      <Text color="red.500" textAlign="center">
        Commande introuvable{" "}
        <span role="img" aria-label="Crying face">
          😢
        </span>
      </Text>
    );
  }

  const addItem = async (item: OrderItem) => {
    if (orderId) {
      addOrderItem(orderId, item, setOrder, setOrderItems);
    }
  };
  const deleteItem = async (itemId: string) => {
    if (orderId) {
      if (!window.confirm("Voulez-vous vraiment supprimer cet article?")) {
        return;
      }
      await deleteOrderItem(orderId, itemId, setOrder, setOrderItems);
    }
  };

  return (
    <>
      <OrderFullCard
        order={order}
        exportOrder={exportOrder}
        deleteOrder={deleteOrder}
      />
      <OrderItemsPanel orderItems={orderItems} onDeleteItem={deleteItem} />
      {loadingItems && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Box>
      )}
      <HStack justifyContent="center" padding="10px">
        <Button onClick={onOpen}>Ajouter un article</Button>
      </HStack>
      <AddItemForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={addItem}
        products={products}
      />
    </>
  );
};

export default OrderDetailsPage;
