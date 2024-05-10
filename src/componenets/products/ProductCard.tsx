import Product from "../../types/product";
import { Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  //   return (
  //     <Tr key={product.id}>
  //       <Td>
  //         <Image src={product.product_image_url} boxSize="60px"></Image>
  //       </Td>
  //       <Td>{product.product_name}</Td>
  //       <Td>{product.product_piece_per_kilo}</Td>
  //       <Td>{product.product_price}</Td>
  //       <Td>
  //         <Button
  //           variant="outline"
  //           colorScheme="red"
  //           m={2}
  //           onClick={() => console.log(product.product_name)}
  //           //   onClick={() => onDeleteproduct(product.id)}
  //         >
  //           Delete
  //         </Button>
  //         <Button
  //           variant="outline"
  //           colorScheme="blue"
  //           onClick={() => console.log(product.id)}
  //           //   onClick={() => onDeleteproduct(product.id)}
  //         >
  //           Update
  //         </Button>
  //       </Td>
  //     </Tr>
  //   );

  return (
    <Card
      borderRadius="15px"
      overflow="hidden"
      _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
      maxWidth="600"
      maxHeight="60"
    >
      <CardBody>
        <HStack>
          <Image src={product.product_image_url} boxSize="50px" />
          <HStack justifyContent="space-between">
            <Text fontSize="2xl">{product.product_name}</Text>
            <Text>{product.product_price} DT</Text>
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
