import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "@/components/Containers/AppContainer";
import UserProvider from "@/contexts/User/UserContext";
import AppRoutes from "@/router";
import TaskProvider from "@/contexts/Task";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <AppContainer>
            <AppRoutes />
          </AppContainer>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
