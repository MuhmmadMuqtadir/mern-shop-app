import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shopkeeper from "./pages/Shopkeeper";
import Salesman from "./pages/Salesman";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopkeeper" element={<Shopkeeper />} />
        <Route path="/salesman" element={<Salesman />} />
      </Routes>
    </Router>
  );
}

export default App;
