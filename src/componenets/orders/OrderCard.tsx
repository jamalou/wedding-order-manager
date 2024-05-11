import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Order, {
  infos_map,
  infos_order_necessary,
  values_order_necessary,
} from "../../types/order";

interface Props {
  order: Order;
}

const OrderCard = ({ order }: Props) => {
  const navigate = useNavigate();
  return (
    <Card borderRadius="15px" overflow="hidden">
      <CardBody>
        <Heading my={4} fontSize="2xl">
          {order.order_name}
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
        >
          <Box>
            {infos_order_necessary.map((info) => (
              <HStack key={info} justifyContent="space-between">
                <Text textAlign="left" fontWeight="bold">
                  {infos_map[info]}:
                </Text>
                <Text textAlign="right">{String(order[info])}</Text>
              </HStack>
            ))}
          </Box>
          <Box>
            {values_order_necessary.map((info) => (
              <HStack key={info} justifyContent="space-between">
                <Text textAlign="left" fontWeight="bold">
                  {infos_map[info]}:
                </Text>
                <Text textAlign="right">{String(order[info])}</Text>
              </HStack>
            ))}
          </Box>
        </Stack>
        <Button
          colorScheme="teal"
          mt={4}
          onClick={() => {
            console.log("Clicked on order card ", order.id);
            navigate(`/orders/${String(order.id)}`);
          }}
        >
          Consulter
        </Button>
      </CardBody>
    </Card>
  );
};
{
  /* <Todo></Todo> */
}
export default OrderCard;
