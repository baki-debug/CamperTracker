import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CamperProvider } from "./context/camperContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CamperProvider>
      <App />
    </CamperProvider>
  </StrictMode>,
);
