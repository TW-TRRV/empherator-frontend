import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Navbar /> <div className="h-120"></div><Footer/></div>,
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
