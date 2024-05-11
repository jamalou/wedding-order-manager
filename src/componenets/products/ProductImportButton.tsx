import React, { useContext } from "react";
import axios from "axios";
import { Button, Input, useToast, VStack } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import api from "../common/api";
import { DataContext } from "../common/DataContext";

const ProductImportButton: React.FC = () => {
  const toast = useToast();
  const { setProducts } = useContext(DataContext);

  // Function to handle file selection and upload
  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Ensure the file is a CSV file
      if (file.type !== "text/csv") {
        toast({
          title: "Erreur de fichier",
          description: "Veuillez sélectionner un fichier CSV.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      // Perform the upload to the '/products/csv' endpoint
      await api
        .post("/products/csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast({
            title: "Fichier téléchargé",
            description: "L'importation en masse des produits a réussi!",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setProducts(res.data.products);
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            toast({
              title: "Erreur",
              description: `Une erreur s'est produite lors de l'importation : ${error.message}`,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Erreur",
              description: "Une erreur inconnue s'est produite.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        });
    }
  };

  return (
    <VStack spacing={4}>
      <Input
        type="file"
        id="csvFileInput"
        hidden
        accept=".csv"
        onChange={handleFileSelect}
      />
      <Button
        leftIcon={<AttachmentIcon />}
        onClick={() => document.getElementById("csvFileInput")!.click()}
        colorScheme="green"
      >
        Importer des produits (CSV)
      </Button>
    </VStack>
  );
};

export default ProductImportButton;
