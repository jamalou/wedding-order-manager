import { Tr, Td, Button } from "@chakra-ui/react";
import OrderItem from "../../types/orderItem";

interface Props {
  orderItem: OrderItem;
  onDelete: (orderItem: OrderItem) => void;
}

const OrderItemRow = ({ orderItem, onDelete }: Props) => {
  return (
    <Tr key={orderItem.id}>
      <Td>{orderItem.product_name}</Td>
      <Td>{orderItem.total_number_pieces}</Td>
      <Td>{orderItem.total_weight}</Td>
      <Td>{orderItem.total_price}</Td>
      <Td>
        <Button
          variant="outline"
          colorScheme="red"
          m={2}
          onClick={() => onDelete(orderItem)}
          //   onClick={() => onDeleteorderItem(orderItem.id)}
        >
          Supprimer
        </Button>
        {/* <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => console.log(orderItem.product_id)}
          //   onClick={() => onDeleteorderItem(orderItem.id)}
        >
          Update
        </Button> */}
      </Td>
    </Tr>
  );
};

export default OrderItemRow;
