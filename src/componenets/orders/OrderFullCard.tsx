import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import Order, {
  infos_map,
  infos_order_all,
  values_order_necessary,
} from "../../types/order";
import { useNavigate } from "react-router-dom";
interface Props {
  order: Order;
  deleteOrder: (id: string) => void;
  exportOrder: (id: string) => void;
}

const OrderFullCard = ({ order, deleteOrder, exportOrder }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        {order.order_name}
      </Heading>
      <Box borderWidth="10px" borderRadius="lg" mx={5} my={4} p={4}>
        <Text fontWeight="bold" fontSize={24} mb={2}>
          Details de la commande:
        </Text>
        <Box borderBottom="5px solid" mb={2} />
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
        >
          <Box>
            {infos_order_all
              .filter((info) => info !== "order_items")
              .map((info) => (
                <HStack key={info} justifyContent="space-between">
                  <Text textAlign="left" fontWeight="bold">
                    {infos_map[info]}:
                  </Text>
                  <Text textAlign="right">{String(order[info])}</Text>
                </HStack>
              ))}
          </Box>
          <Box>
            <Box justifyContent="space-between">
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
              <Box h="100%" />
              <HStack justifyContent="space-between">
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="blue"
                  variant="solid"
                  m={2}
                >
                  Modifier
                </Button>
                {/* Supprimer Button */}
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  variant="solid"
                  onClick={() => deleteOrder(order.id ?? "")}
                  m={2}
                >
                  Supprimer
                </Button>
                {/* Exporter en Excel Button */}
                <Button
                  leftIcon={<DownloadIcon />}
                  onClick={() => {
                    exportOrder(order.id ?? "");
                  }}
                  colorScheme="green"
                  variant="solid"
                  m={2}
                >
                  Exporter en Excel
                </Button>
              </HStack>
            </Box>
          </Box>
        </Stack>

        {order.created_at && (
          <Text mt={2}>Date de creation: {order.created_at}</Text>
        )}
        {order.updated_at && (
          <Text>Date de derniere modification: {order.updated_at}</Text>
        )}
      </Box>
    </>
  );
};

export default OrderFullCard;
