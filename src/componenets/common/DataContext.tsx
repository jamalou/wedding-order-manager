import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Order from "../../types/order";
import Product from "../../types/product";
import api from "./api";
import { set } from "react-hook-form";
import { CanceledError } from "axios";
import OrderItem from "../../types/orderItem";
import { useNavigate } from "react-router-dom";
interface DataContextType {
  orders: Order[];
  loadingOrders: boolean;
  errorOrders: string | null;
  products: Product[];
  loadingProducts: boolean;
  errorProducts: string | null;
  loadingItems: boolean;
  errorItems: string | null;
  fetchOrders: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  updateOrder: (order: Order) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  exportOrder: (orderId: string, orderName: string) => void;
  addOrderItem: (
    orderId: string,
    orderItem: OrderItem,
    setOrder: React.Dispatch<React.SetStateAction<Order | null>>,
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[] | undefined>>
  ) => Promise<void>;
  deleteOrderItem: (
    orderId: string,
    orderItemId: string,
    setOrder: React.Dispatch<React.SetStateAction<Order | null>>,
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[] | undefined>>
  ) => Promise<void>;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

const defaultContext: DataContextType = {
  orders: [],
  loadingOrders: true,
  errorOrders: null,
  products: [],
  loadingProducts: true,
  errorProducts: null,
  loadingItems: true,
  errorItems: null,
  fetchOrders: async () => {},
  fetchProducts: async () => {},
  addOrder: async () => {},
  updateOrder: async () => {},
  deleteOrder: async () => {},
  exportOrder: async () => {},
  addOrderItem: async () => {},
  deleteOrderItem: async () => {},
  setProducts: async () => {},
  addProduct: async () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
};

export const DataContext = createContext<DataContextType>(defaultContext);

interface Props {
  children: React.ReactNode;
}
export const DataProvider = ({ children }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [errorItems, setErrorItems] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook to get the navigate function

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    api
      .get("/orders")
      .then((response) => {
        setOrders(response.data);
        setLoadingOrders(false);
      })
      .catch((error) => {
        setErrorOrders(
          "Une erreur s'est produite lors du chargement des commandes. Kallam Hamma. Hay l'erreur: \n" +
            error
        );
        setLoadingOrders(false);
      });
  };

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await api.get("/products");
      setProducts(response.data);
      setLoadingProducts(false);
    } catch (error) {
      setErrorProducts(
        "Une erreur s'est produite lors du chargement des produits. Kallam Hamma. Hay l'erreur: \n" +
          error
      );
      setLoadingProducts(false);
    }
  };

  // Functions to update data when needed
  const addOrder = async (newOrder: Order) => {
    api
      .post("/orders", newOrder)
      .then((response) => {
        setOrders((prev) => [...prev, response.data.order]);
      })
      .catch((error) => {
        setErrorOrders(
          "Une erreur s'est produite lors de l'ajout de la commande. Kallam Hamma. Hay l'erreur: \n" +
            error
        );
      });
  };

  const updateOrder = async (updatedOrder: Order) => {
    const newOrders = orders.map((order) =>
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(newOrders);
  };

  const deleteOrder = async (orderId: string) => {
    setLoadingOrders(true);
    navigate("/orders");
    if (!window.confirm("Voulez-vous vraiment supprimer cette commande?")) {
      console.log("La suppression de la commande est annulée.");
      return;
    }
    api
      .delete(`/orders/${orderId}`)
      .then((response) => {
        orderId = response.data.id;
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
      })
      .catch((error) => {
        console.error(error);
      });
    setLoadingOrders(false);
  };

  const exportOrder = (orderId: string, orderName: string) => {
    api
      .get(`/orders/export-excel/${orderId}`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `order_${orderName}.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const addProduct = async (newProduct: Product) =>
    setProducts([...products, newProduct]);
  const updateProduct = async (updatedProduct: Product) =>
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  const deleteProduct = async (productId: string) =>
    setProducts(products.filter((product) => product.id !== productId));
  // orderItems management
  const addOrderItem = async (
    orderId: string,
    newOrderItem: OrderItem,
    setOrder: React.Dispatch<React.SetStateAction<Order | null>>,
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[] | undefined>>
  ) => {
    setLoadingItems(true);
    api
      .post(`/orders/${orderId}/items`, newOrderItem)
      .then((response) => {
        const updatedOrder = response.data.order;
        setOrders((prev) =>
          prev.map((order) => {
            if (order.id === orderId) {
              return updatedOrder;
            }
            return order;
          })
        );
        setOrder(updatedOrder);
        setOrderItems(updatedOrder.order_items);
        setLoadingItems(false);
      })
      .catch((error) => {
        setErrorItems(
          "Une erreur s'est produite lors de l'ajout de l'article. Kallam Hamma. Hay l'erreur: \n" +
            error
        );
        setLoadingItems(false);
      });
  };

  const deleteOrderItem = async (
    orderId: string,
    orderItemId: string,
    setOrder: React.Dispatch<React.SetStateAction<Order | null>>,
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[] | undefined>>
  ) => {
    setLoadingItems(true);
    api
      .delete(`/orders/${orderId}/items/${orderItemId}`)
      .then((response) => {
        const updatedOrder = response.data.order;
        setOrders((prev) =>
          prev.map((order) => {
            if (order.id === orderId) {
              return updatedOrder;
            }
            return order;
          })
        );
        setOrder(updatedOrder);
        setOrderItems(updatedOrder.order_items);
        setLoadingItems(false);
      })
      .catch((error) => {
        setErrorItems(
          "Une erreur s'est produite lors de la suppression de l'article. Kallam Hamma. Hay l'erreur: \n" +
            error
        );
        setLoadingItems(false);
      });
  };

  return (
    <DataContext.Provider
      value={{
        orders,
        loadingOrders,
        errorOrders,
        products,
        loadingProducts,
        errorProducts,
        loadingItems,
        errorItems,
        fetchOrders,
        fetchProducts,
        addOrder,
        updateOrder,
        deleteOrder,
        exportOrder,
        addOrderItem,
        deleteOrderItem,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
