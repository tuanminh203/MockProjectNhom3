import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutRoot from "./components/LayoutRoot";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Menu from "./components/Menu";
import ResetPassword from "./components/ResetPassword";
import Tablelist from "./components/Tablelist";
import Booking from "./components/Booking";
import ConfirmRegistration from "./components/ConfirmRegistration";
import { CartProvider } from "./Context/CartContext";
import Cart from "./components/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "tables",
        element: <Tablelist />,
      },
      {
        path: "booking/:id",
        element: <Booking />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/confirm-registration/:email",
    element: <ConfirmRegistration />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
          <RouterProvider router={router} /> {" "}
    </CartProvider>
  </React.StrictMode>
);
