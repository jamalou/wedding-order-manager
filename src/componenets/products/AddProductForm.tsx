import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Product from "../../types/product";

const schema = z.object({
  product_name: z
    .string()
    .min(3, { message: "La description doit comporter au moins 3 caractères" })
    .max(50, { message: "La description ne doit pas dépasser 50 caractères" }),
  product_price: z
    .number({ invalid_type_error: "Le prix est requis" })
    .min(0.01)
    .max(100_000),
  product_category: z.enum(["Sucré", "Salé"], {
    errorMap: () => ({ message: "Selectionnez une catégorie s'il vous plais" }),
  }),
  product_piece_per_kilo: z.number({
    invalid_type_error: "Le nombre de pièces est requis'",
  }),
});
type AddProductFormData = z.infer<typeof schema>;

interface AddProductFormProps {
  onSubmit: (data: AddProductFormData) => void;
  onCancelAddProduct: () => void;
  product?: Product;
}

const AddProductForm = ({
  onSubmit,
  onCancelAddProduct,
  product,
}: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <Box mx={4}>
      <Box maxWidth="500px">
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
          <FormControl isInvalid={!!errors.product_name} mb={3}>
            <FormLabel htmlFor="product_name">Nom du produit</FormLabel>
            <Input
              id="product_name"
              type="text"
              {...register("product_name")}
              value={product?.product_name}
            />
            <FormErrorMessage>{errors.product_name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.product_price} mb={3}>
            <FormLabel htmlFor="product_price">Prix</FormLabel>
            <Input
              id="product_price"
              type="number"
              {...register("product_price", { valueAsNumber: true })}
              value={product?.product_price}
            />
            <FormErrorMessage>{errors.product_price?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.product_piece_per_kilo} mb={3}>
            <FormLabel htmlFor="product_piece_per_kilo">Pièces/kg</FormLabel>
            <Input
              id="product_piece_per_kilo"
              type="number"
              {...register("product_piece_per_kilo", { valueAsNumber: true })}
              value={product?.product_piece_per_kilo}
            />
            <FormErrorMessage>
              {errors.product_piece_per_kilo?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.product_category} mb={3}>
            <FormLabel htmlFor="product_category">Catégorie</FormLabel>
            <Select
              id="product_category"
              {...register("product_category")}
              value={product?.product_category}
            >
              <option value=""></option>
              {["Sucré", "Salé"].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.product_category?.message}
            </FormErrorMessage>
          </FormControl>

          <Button colorScheme="blue" type="submit" m={2}>
            Ajouter
          </Button>
          <Button colorScheme="yellow" onClick={onCancelAddProduct} m={2}>
            Annuler
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddProductForm;
