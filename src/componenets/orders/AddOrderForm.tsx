import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Order from "../../types/order";
import { useState } from "react";

const schema = z.object({
  order_name: z
    .string()
    .min(3, { message: "Au moins 3 caractères" })
    .max(50, { message: "Au plus 50 caractères" }),
  customer_name: z
    .string()
    .min(3, { message: "Au moins 3 caractères" })
    .max(50, { message: "Au plus 50 caractères" }),
  customer_phone: z
    .string()
    .min(8, { message: "Au moins 8 caractères" })
    .max(10, { message: "Au plus 10 caractères" }),
  customer_address: z
    .string()
    .min(3, { message: "Au moins 3 caractères" })
    .max(50, { message: "Au plus 50 caractères" }),
  wedding_date: z
    .string()
    .min(3, { message: "Au moins 3 caractères" })
    .max(50, { message: "Au plus 50 caractères" }),
  wedding_number_of_guests: z.number(),
});
type AddOrderFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: AddOrderFormData) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isSubmitting: boolean;
  order?: Order;
}

const AddOrderForm = ({
  onSubmit,
  isOpen,
  onClose,
  onOpen,
  isSubmitting,
  order,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddOrderFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Créer une nouvelle commande</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              reset();
            })}
          >
            <FormControl isInvalid={!!errors.order_name} mb={3}>
              <FormLabel htmlFor="order_name">Nom de la commande</FormLabel>
              <Input
                id="order_name"
                type="text"
                {...register("order_name")}
                value={order?.order_name}
              />
              <FormErrorMessage>{errors.order_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.customer_name} mb={3}>
              <FormLabel htmlFor="customer_name">Nom du client</FormLabel>
              <Input
                id="customer_name"
                type="text"
                {...register("customer_name")}
                value={order?.customer_name}
              />
              <FormErrorMessage>
                {errors.customer_name?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.customer_phone} mb={3}>
              <FormLabel htmlFor="customer_phone">
                Téléphone du client
              </FormLabel>
              <Input
                id="customer_phone"
                type="text"
                {...register("customer_phone")}
                value={order?.customer_phone}
              />
              <FormErrorMessage>
                {errors.customer_phone?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.customer_address} mb={3}>
              <FormLabel htmlFor="customer_address">
                Adresse du client
              </FormLabel>
              <Input
                id="customer_address"
                type="text"
                {...register("customer_address")}
                value={order?.customer_address}
              />
              <FormErrorMessage>
                {errors.customer_address?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.wedding_date} mb={3}>
              <FormLabel htmlFor="wedding_date">Date du mariage</FormLabel>
              <Input
                id="wedding_date"
                type="text"
                {...register("wedding_date")}
                value={order?.wedding_date}
              />
              <FormErrorMessage>
                {errors.wedding_date?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.wedding_number_of_guests} mb={3}>
              <FormLabel htmlFor="wedding_number_of_guests">
                Nombre d'invités
              </FormLabel>
              <Input
                id="wedding_number_of_guests"
                type="number"
                {...register("wedding_number_of_guests", {
                  valueAsNumber: true,
                })}
                value={order?.wedding_number_of_guests}
              />
              <FormErrorMessage>
                {errors.wedding_number_of_guests?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={isSubmitting}
              type="submit"
            >
              Ajouter commande
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Annuler
            </Button>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOrderForm;
