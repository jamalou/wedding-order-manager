import Product from "../../types/product";
import { Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
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
