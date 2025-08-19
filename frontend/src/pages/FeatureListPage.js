import React, { useState, useEffect } from "react";
import { STATUS_LIST } from "../data";
import MappingForm from "../components/MappingForm";
import "./FeatureListPage.css";

export default function FeatureListPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [features, setFeatures] = useState([]);
  const [markets, setMarkets] = useState([]);

  // Fetch all features
  const fetchFeatures = () => {
    fetch("https://feature-mapping-app-2.onrender.com/api/features")
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error("Error fetching features:", err));
  };

  // Fetch all markets
  const fetchMarkets = () => {
    fetch("https://feature-mapping-app-2.onrender.com/api/markets")
      .then((res) => res.json())
      .then((data) => setMarkets(data))
      .catch((err) => console.error("Error fetching markets:", err));
  };

  useEffect(() => {
    fetchFeatures();
    fetchMarkets();
  }, []);

  // Delete feature
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    fetch(`https://feature-mapping-app-2.onrender.com/api/features/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete feature");
        fetchFeatures();
      })
      .catch((err) => console.error(err));
  };

  const filteredFeatures =
    categoryFilter === "All"
      ? features
      : features.filter((f) => f.category === categoryFilter);

  return (
    <div className="feature-list-page">
      <h2>Feature List</h2>

      {/* Category Filter */}
      <div className="category-filter">
        <label>Category:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All</option>
          <option>Safety</option>
          <option>Comfort</option>
          <option>Infotainment</option>
        </select>
      </div>

      {/* Feature Table */}
      <table className="feature-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeatures.map((f) => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td>{f.description}</td>
              <td>{f.category}</td>
              <td>
                <button onClick={() => handleDelete(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mapping Form */}
      <div className="mapping-form-container">
        <MappingForm
          markets={markets}
          statuses={STATUS_LIST}
        />
      </div>
    </div>
  );
}
