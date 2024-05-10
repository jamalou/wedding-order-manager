import OrderItem from "./orderItem";
type StringDictionary = { [key: string]: string };

interface Order {
    [key: string]: string | number | undefined | OrderItem[];
    id?: string;
    order_name: string;
    created_at?: string;
    updated_at?: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    wedding_date: string;
    wedding_number_of_guests: number;
    order_total_price?: number;
    order_total_weight?: number;
    order_total_number_pieces?: number;
    order_items?: OrderItem[];
}

const infos_map: StringDictionary = {
    "id": "ID de la commande",
    "order_name": "Nom de la commande",
    "created_at": "Date de création",
    "updated_at": "Date de dernière modification",
    "customer_name": "Nom du client",
    "customer_phone": "Téléphone du client",
    "customer_address": "Adresse du client",
    "wedding_date": "Date du mariage",
    "wedding_number_of_guests": "Nombre d'invités",
    "order_total_price": "Prix total",
    "order_total_weight": "Poids total",
    "order_total_number_pieces": "Nombre total de pièces",
    "order_items": "Items de la commande",
}

const infos_order_all: string[] = [
    "id",
    "order_name",
    "created_at",
    "updated_at",
    "customer_name",
    "customer_phone",
    "customer_address",
    "wedding_date",
    "wedding_number_of_guests"
]

const infos_order_necessary: string[] = [
    "customer_name",
    "customer_phone",
    "customer_address",
    "wedding_date",
    "wedding_number_of_guests"
]

const values_order_necessary: string[] = [
    "order_total_price",
    "order_total_weight",
    "order_total_number_pieces",
]

export default Order;

export { infos_map, infos_order_all, infos_order_necessary, values_order_necessary };