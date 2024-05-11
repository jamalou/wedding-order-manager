import { Tr, Td, Text, Button, Image, Box, HStack } from "@chakra-ui/react";
import OrderItem from "../../types/orderItem";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  orderItem: OrderItem;
  onDelete: (orderItem: OrderItem) => void;
}

const OrderItemRow = ({ orderItem, onDelete }: Props) => {
  return (
    <Tr key={orderItem.id}>
      <Td whiteSpace="nowrap">
        <HStack width="auto" overflow="hidden">
          <Image
            src={orderItem.product_image_url}
            alt="Product Image"
            htmlWidth="60px" // Use htmlWidth and htmlHeight to control element size
            htmlHeight="60px"
            objectFit="contain"
            maxWidth="100%" // Ensure the image is responsive and adheres to the box constraints
            display="block"
          />
          <Text fontSize="xl" as="b" ml={5}>
            {orderItem.product_name}
          </Text>
          {/* {orderItem.product_name} */}
        </HStack>
      </Td>
      <Td whiteSpace="nowrap" width="0.1%">
        {orderItem.total_number_pieces} pièces
      </Td>
      <Td whiteSpace="nowrap" width="0.1%">
        {orderItem.total_weight} kg
      </Td>
      <Td whiteSpace="nowrap" width="0.1%">
        {orderItem.total_price} DT
      </Td>
      <Td whiteSpace="nowrap" width="0.1%">
        <Button
          leftIcon={<DeleteIcon />}
          variant="ghost"
          colorScheme="red"
          m={2}
          onClick={() => onDelete(orderItem)}
        ></Button>
      </Td>
    </Tr>
  );
};

{
  /* <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => console.log(orderItem.product_id)}
          //   onClick={() => onDeleteorderItem(orderItem.id)}
        >
          Update
        </Button> */
}
export default OrderItemRow;
