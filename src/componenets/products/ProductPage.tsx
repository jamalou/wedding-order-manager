import {
  Box,
  Button,
  Input,
  Spinner,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext, useMemo, useState } from "react";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import { DataContext } from "../common/DataContext";
import ProductImportButton from "./ProductImportButton";

const ProductPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { products, loadingProducts, errorProducts, addProduct } =
    useContext(DataContext);

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
  // Example of using useBreakpointValue
  const inputWidth = useBreakpointValue({
    base: "300px",
    sm: "400px",
    md: "500px",
  });
  const fontSize = useBreakpointValue({ base: "20px", md: "22px", lg: "24px" });

  // Sort products by product_category and product_name
  const sortedProducts = useMemo(() => {
    return products.sort((a, b) => {
      // Compare by product_category first
      if (a.product_category < b.product_category) return -1;
      if (a.product_category > b.product_category) return 1;

      // If product_category is the same, then sort by product_name
      return a.product_name.localeCompare(b.product_name);
    });
  }, [products]);

  // Filter products based on the search term
  const filteredProducts = sortedProducts.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        borderWidth="10px"
        borderRadius="lg"
        mx={[2, 3, 5]}
        my={4}
        p={[2, 3, 4]}
      >
        <VStack spacing={4}>
          <ProductImportButton />
          <Text fontWeight="bold" fontSize={fontSize} mb={2}>
            Nos Produits:
          </Text>
          <Box borderBottom="5px solid" mb={2} />
          <Input
            maxWidth={inputWidth}
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <ProductList products={filteredProducts} />
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
        </VStack>
      </Box>
    </>
  );
};

export default ProductPage;
