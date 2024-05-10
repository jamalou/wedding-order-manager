import { Tr, Td, Button, Image, HStack, VStack } from "@chakra-ui/react";
import Product from "../../types/product";
import FileUploadButton from "./FileUploadButton";

interface Props {
  product: Product;
}

const ProductRow = ({ product }: Props) => {
  return (
    <Tr key={product.id}>
      <Td>
        <Image src={product.product_image_url} boxSize="60px"></Image>
      </Td>
      <Td>{product.product_name}</Td>
      <Td>{product.product_piece_per_kilo}</Td>
      <Td>{product.product_price}</Td>
      <Td>
        <VStack>
          <Button
            variant="outline"
            colorScheme="red"
            m={2}
            onClick={() => console.log(product.product_name)}
            //   onClick={() => onDeleteproduct(product.id)}
          >
            Delete
          </Button>
          {/* <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => console.log(product.id)}
            //   onClick={() => onDeleteproduct(product.id)}
          >
            Mettre à jour
          </Button> */}
          <FileUploadButton productId={product.id ?? ""} />
        </VStack>
      </Td>
    </Tr>
  );
};

export default ProductRow;
