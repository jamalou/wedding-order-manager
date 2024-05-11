import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import { DataContext } from "../common/DataContext";
import ProductImportButton from "./ProductImportButton";

const ProductPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { products, loadingProducts, errorProducts, addProduct } =
    useContext(DataContext);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (errorProducts) {
    return (
      <Text color="red.500" textAlign="center">
        {errorProducts}{" "}
        <span role="img" aria-label="Crying face">
          😢
        </span>
      </Text>
    );
  }
  if (loadingProducts) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }
  return (
    <>
      <Box borderWidth="10px" borderRadius="lg" mx={5} my={4} p={4}>
        <ProductImportButton />
        <Text fontWeight="bold" fontSize={24} mb={2}>
          Nos Produits:
        </Text>
        <Box borderBottom="5px solid" mb={2} />
        <Input
          maxWidth="500px"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={4}
        />
        {filteredProducts && <ProductList products={filteredProducts} />}
        {!showForm && (
          <Button
            colorScheme="blue"
            onClick={() => setShowForm(!showForm)}
            mt={4}
          >
            Ajouter un produit
          </Button>
        )}
        {showForm && (
          <Box mt={4}>
            <AddProductForm
              onSubmit={(data) => {
                addProduct({ ...data, id: `${products.length + 1}` });
                setShowForm(!showForm);
              }}
              onCancelAddProduct={() => setShowForm(!showForm)}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProductPage;
