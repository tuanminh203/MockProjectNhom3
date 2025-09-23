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
import MenuItemDetail from "./components/MenuItemDetail";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Context/AuthContext";
import Contact from "./components/Contact";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
        path: "menu/:id",
        element: <MenuItemDetail />,
      },
      {
        path: "tables",
        element: <Tablelist />,
      },
      {
        path: "booking/:id",
        element: <Booking />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
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
    <AuthProvider>
      <ToastContainer />
      <CartProvider>
            <RouterProvider router={router} /> {" "}
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
