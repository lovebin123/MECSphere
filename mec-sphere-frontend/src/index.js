import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Pages/HomePage";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
