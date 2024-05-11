
interface Product {
    id?: string;
    product_name: string;
    product_category: string;
    product_image_url?: string;
    product_price: number;
    product_piece_per_kilo: number;
}

export const product_infos_map = {
    "id": "ID du produit",
    "product_piece_per_kilo": "Pièces/kg",
    "product_name": "Nom",
    "product_category": "Catégorie",
    "product_status": "Statut",
    "product_image_url": "Image",
    "product_price": "Prix",
}

export default Product;