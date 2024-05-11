import {
  Box,
  Button,
  Input,
  Text,
  HStack,
  RadioGroup,
  Stack,
  Radio,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import OrderItem from "../../types/orderItem";
import { useState } from "react";
import Product from "../../types/product";
import ProductCard from "../products/ProductCard";

interface Props {
  products: Product[];
  onSubmit: (data: OrderItem) => void;
  isOpen: boolean;
  onClose: () => void;
}
const AddItemForm = ({ products, onSubmit, isOpen, onClose }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [numberOfPieces, setNumberOfPieces] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [inputType, setInputType] = useState<"pieces" | "weight">("pieces");
  const [formError, setFormError] = useState<string | undefined>(undefined);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset form fields when modal is closed
  const handleModalClose = () => {
    setSelectedProduct(undefined);
    setNumberOfPieces(0);
    setWeight(0);
    setInputType("pieces");
    setFormError(undefined);
    onClose();
  };
  // Handle form submission
  const handleSubmit = () => {
    if (selectedProduct) {
      onSubmit({
        product_id: selectedProduct.id,
        ...(numberOfPieces
          ? { total_number_pieces: numberOfPieces }
          : { total_weight: weight }),
      });
      handleModalClose();
    }
  };

  const isFloat = (str: string): boolean => {
    return /^\d*\.?\d+$/.test(str) || /^\d+\.?\d*$/.test(str);
  };

  const isInt = (str: string): boolean => {
    return /^\d+$/.test(str);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un produit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!selectedProduct && (
            <>
              <Input
                maxWidth="500px"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={4}
              />
              {/* Display filtered products */}
              {filteredProducts.length > 0 ? (
                <Box mt={2}>
                  {filteredProducts.map((product) => (
                    <Box
                      key={product.id}
                      my={2}
                      w="100%"
                      onClick={() => {
                        setSelectedProduct(product);
                      }}
                    >
                      <ProductCard product={product} />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Text mt={2}>Aucun produit trouvé.</Text>
              )}
            </>
          )}
          {
            // Display selected product
            selectedProduct && (
              <Box mb={4}>
                <Text fontWeight="bold">Produit sélectionné:</Text>
                <ProductCard product={selectedProduct} />
              </Box>
            )
          }

          {/* Form fields for nombre de pièces and poids */}
          {selectedProduct && (
            <Box mt={4} maxWidth={250}>
              {/* Radio buttons for input type */}
              <RadioGroup
                mt={2}
                value={inputType}
                onChange={(value) => setInputType(value as "pieces" | "weight")}
              >
                <Stack direction="row">
                  <Radio value="pieces">Nombre de pièces</Radio>
                  <Radio value="weight">Poids</Radio>
                </Stack>
              </RadioGroup>

              {/* Input fields based on selected input type */}
              {inputType === "pieces" ? (
                <Input
                  type="text"
                  placeholder="Nombre de pièces"
                  mt={2}
                  // value={numberOfPieces}
                  onChange={(e) => {
                    if (!isInt(e.target.value)) {
                      setFormError(
                        "Le nombre de pièces doit être un entier (ex: 50)"
                      );
                    } else {
                      setFormError(undefined);
                    }
                    setNumberOfPieces(
                      e.target.value === "" ? 0 : Number(e.target.value)
                    );
                  }}
                />
              ) : (
                <Input
                  type="text"
                  mt={2}
                  placeholder="Poids"
                  // value={weight}
                  onChange={(e) => {
                    if (!isFloat(e.target.value)) {
                      setFormError("Le poids doit être un nombre (ex: 5.5)");
                    } else {
                      setFormError(undefined);
                    }
                    setWeight(
                      e.target.value === "" ? 0 : Number(e.target.value)
                    );
                  }}
                />
              )}
              {formError && <Text color="red.500">{formError}</Text>}
            </Box>
          )}
          <HStack>
            <Button
              colorScheme="blue"
              m={2}
              isDisabled={
                !selectedProduct ||
                (inputType === "pieces" && numberOfPieces === 0) ||
                (inputType === "weight" && weight === 0) ||
                !!formError
              }
              onClick={handleSubmit}
            >
              Ajouter
            </Button>
            <Button onClick={handleModalClose} m={2}>
              Annuler
            </Button>
          </HStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddItemForm;
