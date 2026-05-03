import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";

import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Catalog from "@/pages/Catalog";
import Product from "./pages/Product";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <Login></Login>,
   },
  {
    path: '/cart',
    element: <Cart></Cart>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/product/:productId',
    element: <Product />,
  },
  {
    path: '/catalog',
    element: <Catalog />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <RouterProvider router={router} /> 
    
  </React.StrictMode>,
);
