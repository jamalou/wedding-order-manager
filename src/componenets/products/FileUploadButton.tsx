import React from "react";
import axios from "axios";
import { Button, Input, useToast, VStack } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import api from "../common/api";

interface FileUploadButtonProps {
  productId: string;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ productId }) => {
  const toast = useToast();

  // Function to handle file selection and upload
  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append("image", file);

      try {
        // Perform the upload
        const response = await api.post(
          `/products/upload-image/${productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast({
          title: "File Uploaded",
          description: "L'image a été téléchargée avec succès!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            title: "Error",
            description: `Une erreur s\'est produite lors du téléchargement de l\'image : ${error.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "Une erreur inconnue s'est produite",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <VStack spacing={4}>
      <Input type="file" id="fileInput" hidden onChange={handleFileSelect} />
      <Button
        leftIcon={<AttachmentIcon />}
        onClick={() => document.getElementById("fileInput")!.click()}
        colorScheme="blue"
      >
        Charger l'image
      </Button>
    </VStack>
  );
};

export default FileUploadButton;
