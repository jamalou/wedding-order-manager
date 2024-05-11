import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ProductRow from "./ProductRow";
import Product from "../../types/product";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <>
      <Table variant="striped" borderWidth="1px" borderRadius="lg" mb={4}>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Nom</Th>
            <Th>Nb pièces/kg</Th>
            <Th>Prix/kg</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ProductList;
