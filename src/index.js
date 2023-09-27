import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './css/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import ProductList from './productlist';
import ErrorPage from './error';
import AddProduct from './add-product';
import Add from './text';

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
  {
    path: "/text",
    element: <Add />,
    errorElement: <ErrorPage />,
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

