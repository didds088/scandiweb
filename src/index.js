import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './css/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import 'animate.css';
import ProductList from './productlist';
import ErrorPage from './error';
import AddProduct from './add-product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
    errorElement: <ErrorPage />,
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

