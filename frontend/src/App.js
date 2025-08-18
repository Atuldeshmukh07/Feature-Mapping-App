import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MasterView from "./pages/MasterView";
import FeatureList from "./pages/FeatureListPage";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Master View</Link></li>
          <li><Link to="/features">Feature List</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<MasterView />} />
        <Route path="/features" element={<FeatureList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
