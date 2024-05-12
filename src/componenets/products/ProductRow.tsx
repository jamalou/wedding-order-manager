import { Tr, Td, Button, Image, VStack } from "@chakra-ui/react";
import Product from "../../types/product";
import FileUploadButton from "./FileUploadButton";
import { useState } from "react";

interface Props {
  product: Product;
}

const ProductRow = ({ product }: Props) => {
  const [currentProduct, setCurrentProduct] = useState<Product>(product);
  function correctStorageUrl(url: string | undefined) {
    if (url) {
      return url.replace("storage.cloud.google.com", "storage.googleapis.com");
    }
    return "";
  }
  return (
    <Tr key={currentProduct.id}>
      <Td>
        <Image
          src={correctStorageUrl(currentProduct.product_image_url)}
          alt={currentProduct.product_name}
          boxSize="100px"
          loading="lazy"
        />
      </Td>
      <Td>{currentProduct.product_name}</Td>
      <Td>{currentProduct.product_piece_per_kilo}</Td>
      <Td>{currentProduct.product_price}</Td>
      <Td>
        <VStack>
          <Button
            variant="outline"
            colorScheme="red"
            m={2}
            onClick={() => console.log(currentProduct.product_name)}
            //   onClick={() => onDeleteproduct(currentProduct.id)}
          >
            Supprimer
          </Button>
          {/* <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => console.log(currentProduct.id)}
            //   onClick={() => onDeleteproduct(currentProduct.id)}
          >
            Mettre à jour
          </Button> */}
          <FileUploadButton
            productId={product?.id || ""}
            setProduct={setCurrentProduct}
          />
        </VStack>
      </Td>
    </Tr>
  );
};

export default ProductRow;
