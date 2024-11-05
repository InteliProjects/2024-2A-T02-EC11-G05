import React from "react";
import LandPage from "./pages/Land-Page";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from "./pages/Dash-Board";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
