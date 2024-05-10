import { Box, Button, Text } from "@chakra-ui/react";
import AddItemForm from "../items/AddItemForm";

import OrderItem from "../../types/orderItem";
import OrderItemsList from "../items/OrderItemsList";

import Product from "../../types/product";
import { useContext, useState } from "react";
import { DataContext } from "../common/DataContext";
interface Props {
  orderItems: OrderItem[] | undefined;
  onDeleteItem: (itemId: string) => void;
}

const OrderItemsPanel = ({ orderItems, onDeleteItem }: Props) => {
  return (
    <Box borderWidth="10px" borderRadius="lg" mx={5} my={4} p={4}>
      <Text fontWeight="bold" fontSize={24} mb={2}>
        Articles de la commande:
      </Text>
      <Box borderBottom="5px solid" mb={2} />
      {orderItems ? (
        <OrderItemsList
          orderItems={orderItems}
          onDelete={(itemId) => onDeleteItem(itemId)}
        />
      ) : (
        <Text>Aucun article pour le moment</Text>
      )}
    </Box>
  );
};

export default OrderItemsPanel;
