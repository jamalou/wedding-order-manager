import Product from "../../types/product";
import { Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  function correctStorageUrl(url: string | undefined) {
    if (url) {
      return url.replace("storage.cloud.google.com", "storage.googleapis.com");
    }
    return "";
  }

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
          <Image
            src={correctStorageUrl(product.product_image_url)}
            alt={product.product_name}
            loading="lazy"
            boxSize="50px"
          />
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
