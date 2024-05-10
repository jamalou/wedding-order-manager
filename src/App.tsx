import { Box, Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Navigation from "./componenets/common/Navigation";
import OrderGrid from "./componenets/orders/OrdersPage";
import OrderPage from "./componenets/orders/OrderDetailsPage";
import OrderItemCard from "./componenets/items/OrderItemRow";
import OrderItemsList from "./componenets/items/OrderItemsList";
import ProductPage from "./componenets/products/ProductPage";
import { useState } from "react";
import OrderDetailsPage from "./componenets/orders/OrderDetailsPage";
import { order_ex, products_ex } from "./data/examples";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./componenets/common/DataContext";

function App() {
  return (
    <Router>
      <DataProvider>
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav" "main"`,
          }}
        >
          <GridItem area="nav">
            <Navigation />
          </GridItem>

          <GridItem area="main">
            <Routes>
              <Route path="/" element={<OrderGrid />} />
              <Route path="/orders" element={<OrderGrid />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
            </Routes>
            <Box w="100%" h="150" />
          </GridItem>
        </Grid>
      </DataProvider>
    </Router>
  );
}

export default App;
//     <FileUploadButton endpoint="https://marriage-calculator-image-n2oc5pjija-uc.a.run.app/products/upload-image/SkQyNRwW9vMtlReBYZlL" />
