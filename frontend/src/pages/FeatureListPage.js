import React, { useState, useEffect } from "react";
import { initialVehicles, MARKETS, STATUS_LIST } from "../data";
import MappingForm from "../components/MappingForm";
import "./FeatureListPage.css";

export default function FeatureListPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [features, setFeatures] = useState([]);
  // const [form, setForm] = useState({ id: null, name: "", description: "", category: "" });
  // const [isEditing, setIsEditing] = useState(false);

  // Fetch all features
  const fetchFeatures = () => {
    fetch("http://localhost:8080/api/features")
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error("Error fetching features:", err));
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Create or update feature
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const method = isEditing ? "PUT" : "POST";
  //   const url = isEditing
  //     ? `http://localhost:8080/api/features/${form.id}`
  //     : "http://localhost:8080/api/features";

  //   fetch(url, {
  //     method,
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to save feature");
  //       return res.json();
  //     })
  //     .then(() => {
  //       fetchFeatures();
  //       resetForm();
  //     })
  //     .catch((err) => console.error(err));
  // };

  // Delete feature
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    fetch(`http://localhost:8080/api/features/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete feature");
        fetchFeatures();
      })
      .catch((err) => console.error(err));
  };

  // Edit feature
  // const handleEdit = (feature) => {
  //   setForm(feature);
  //   setIsEditing(true);
  // };

  // // Reset form
  // const resetForm = () => {
  //   setForm({ id: null, name: "", description: "", category: "" });
  //   setIsEditing(false);
  // };

  const filteredFeatures =
    categoryFilter === "All"
      ? features
      : features.filter((f) => f.category === categoryFilter);

  return (
    <div className="feature-list-page">
      <h2>Feature List</h2>

      {/* Feature Form */}
      {/* <form className="feature-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option>Safety</option>
          <option>Comfort</option>
          <option>Infotainment</option>
        </select>
        <button type="submit">{isEditing ? "Update" : "Add"} Feature</button>
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form> */}

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
                {/* <button onClick={() => handleEdit(f)}>Edit</button> */}
                <button onClick={() => handleDelete(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mapping Form */}
      <div className="mapping-form-container">
        <MappingForm
          vehicles={initialVehicles}
          markets={MARKETS}
          statuses={STATUS_LIST}
        />
      </div>
    </div>
  );
}
