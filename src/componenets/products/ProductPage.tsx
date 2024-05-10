import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import ProductList from "./ProductList";
import Product from "../../types/product";
import AddProductForm from "./AddProductForm";
import api from "../common/api";
import { DataContext } from "../common/DataContext";

const ProductPage = () => {
  const [showForm, setShowForm] = useState(false);

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
  return (
    <Box borderWidth="10px" borderRadius="lg" mx={5} my={4} p={4}>
      <Text fontWeight="bold" fontSize={24} mb={2}>
        Nos Produits:
      </Text>
      <Box borderBottom="5px solid" mb={2} />
      {products && <ProductList products={products} />}
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
  );
};

export default ProductPage;
