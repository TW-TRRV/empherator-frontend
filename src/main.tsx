import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import Product from "@/pages/Product";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
   },
  {
    path: '/product/:productId',
    element: <Product />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <RouterProvider router={router} /> 
    
  </React.StrictMode>,
);
