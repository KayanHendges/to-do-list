import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "@/components/Containers/AppContainer";
import UserProvider from "@/contexts/UserContext";
import AppRoutes from "@/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AppContainer>
          <AppRoutes />
        </AppContainer>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
