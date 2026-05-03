import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  // {
  //   // The :userId denotes a dynamic URL parameter
  //   path: '/profile/:userId',
  //   element: <Profile />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <RouterProvider router={router} /> 
    
  </React.StrictMode>,
);
