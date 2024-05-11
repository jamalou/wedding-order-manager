import { Table, Tbody, Td, Th, Thead, Tr, Text, Box } from "@chakra-ui/react";
import OrderItem from "../../types/orderItem";
import OrderItemRow from "./OrderItemRow";

interface Props {
  orderItems: OrderItem[];
  onDelete: (itemId: string) => void;
}

const OrderItemsList = ({ orderItems, onDelete }: Props) => {
  if (!orderItems || orderItems.length === 0) return null;
  const sortedOrderItems = [...orderItems].sort((a, b) => {
    // Compare 'created_at' first
    const dateComparison =
      new Date(a.created_at ?? "1990-01-01T00:00:00.000Z").getTime() -
      new Date(b.created_at ?? "1990-01-01T00:00:00.000Z").getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }
    // If 'created_at' is the same, compare 'item_name'
    return String(a.product_name).localeCompare(String(b.product_name)) ?? 0;
  });
  return (
    //Box overflowX="auto" mx={4}
    <>
      <Table variant="striped" borderWidth="1px" borderRadius="lg" mb={4}>
        <Thead>
          <Tr>
            <Th fontSize="medium">Article</Th>
            <Th fontSize="medium">Nb pièces</Th>
            <Th fontSize="medium">Poid total</Th>
            <Th fontSize="medium">Prix total</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {sortedOrderItems.map((orderItem) => (
            <OrderItemRow
              key={orderItem.id}
              orderItem={orderItem}
              onDelete={() => onDelete(String(orderItem.id))}
            />
          ))}
        </Tbody>
        <tfoot>
          <Tr>
            <Td>
              <Text fontSize="x-large" align="right">
                Total
              </Text>
            </Td>
            <Td whiteSpace="nowrap" width="0.1%">
              {orderItems.reduce(
                (acc, orderItem) => acc + (orderItem.total_number_pieces ?? 0),
                0
              ) + " pièces"}
            </Td>
            <Td whiteSpace="nowrap" width="0.1%">
              {orderItems
                .reduce(
                  (acc, orderItem) => acc + (orderItem.total_weight ?? 0),
                  0
                )
                .toFixed(2) + " kg"}
            </Td>
            <Td whiteSpace="nowrap" width="0.1%">
              {orderItems
                .reduce(
                  (acc, orderItem) => acc + (orderItem.total_price ?? 0),
                  0
                )
                .toFixed(2) + " DT"}
            </Td>
          </Tr>
        </tfoot>
      </Table>
    </>
  );
};

export default OrderItemsList;
