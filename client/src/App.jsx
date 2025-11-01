import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/Home";
import { Toaster, toast } from "sonner";
import Bills from "./pages/Bills";

function App() {
  return (
    <main className="min-h-[100dvh] bg-[#FFDCDC]">
      <Router>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/bills" element={<Bills />} /> */}
        </Routes>
      </Router>
    </main>
  );
}

export default App;
