interface OrderItem {
    id?: string;
    product_image_url?: string;
    product_id?: string;
    product_name?: string;
    product_price?: number;
    product_piece_per_kilo?: number;
    total_number_pieces?: number;
    total_weight?: number;
    total_price?: number;
    created_at?: string;
    updated_at?: string;
}

const item_infos_map = {
    "id": "ID de l'item",
    "product_image_url": "Image du produit",
    "product_id": "ID du produit",
    "product_name": "Nom du produit",
    "product_price": "Prix du produit",
    "product_piece_per_kilo": "Prix par kilo",
    "total_number_pieces": "Nombre total de pièces",
    "total_weight": "Poids total",
    "total_price": "Prix total",
    "created_at": "Date de création",
    "updated_at": "Date de dernière modification"
}
export default OrderItem;

export { item_infos_map };