import React, { useState, useEffect } from "react";
import "./MasterView.css";

export default function MasterView() {
  const [features, setFeatures] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [newFeature, setNewFeature] = useState({ name: "", category: "", description: "" });
  const [newVehicle, setNewVehicle] = useState({ name: "", modelYear: "" });
  const [editFeatureId, setEditFeatureId] = useState(null);

  // Fetch all data from backend
  useEffect(() => {
    // Features
    fetch("http://localhost:8080/api/features")
      .then(res => res.json())
      .then(data => setFeatures(data || []))
      .catch(err => console.error("Error fetching features:", err));

    // Vehicles
    fetch("http://localhost:8080/api/vehicle-models") // Corrected endpoint
      .then(res => res.json())
      .then(data => setVehicles(data || []))
      .catch(err => console.error("Error fetching vehicles:", err));
  }, []);

  // Add Feature
  const addFeature = () => {
    if (!newFeature.name || !newFeature.category) return alert("Fill all fields");
    fetch("http://localhost:8080/api/features", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeature),
    })
      .then(res => res.json())
      .then(data => {
        setFeatures(prev => [...prev, data]);
        setNewFeature({ name: "", category: "", description: "" });
      })
      .catch(err => console.error("Error adding feature:", err));
  };

  // Start Editing Feature
  const startEditFeature = (feature) => {
    setEditFeatureId(feature.id);
    setNewFeature({
      name: feature.name,
      category: feature.category,
      description: feature.description || ""
    });
  };

  // Update Feature
  const updateFeature = () => {
    if (!editFeatureId) return;
    fetch(`http://localhost:8080/api/features/${editFeatureId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeature),
    })
      .then(res => res.json())
      .then(updated => {
        setFeatures(prev => prev.map(f => (f.id === editFeatureId ? updated : f)));
        setEditFeatureId(null);
        setNewFeature({ name: "", category: "", description: "" });
      })
      .catch(err => console.error("Error updating feature:", err));
  };

  // Delete Feature
  const deleteFeature = (id) => {
    fetch(`http://localhost:8080/api/features/${id}`, { method: "DELETE" })
      .then(() => setFeatures(prev => prev.filter(f => f.id !== id)))
      .catch(err => console.error("Error deleting feature:", err));
  };

  // Add Vehicle
  const addVehicle = () => {
    if (!newVehicle.name || !newVehicle.modelYear) return alert("Fill all fields");
    fetch("http://localhost:8080/api/vehicle-models", { // Corrected endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVehicle),
    })
      .then(res => res.json())
      .then(addedVehicle => {
        setVehicles(prev => [...prev, addedVehicle]);
        setNewVehicle({ name: "", modelYear: "" });
      })
      .catch(err => console.error("Error adding vehicle:", err));
  };

  // Delete Vehicle
  const deleteVehicle = (id) => {
    fetch(`http://localhost:8080/api/vehicle-models/${id}`, { method: "DELETE" }) // Corrected endpoint
      .then(() => setVehicles(prev => prev.filter(v => v.id !== id)))
      .catch(err => console.error("Error deleting vehicle:", err));
  };

  return (
    <div className="container">
      {/* Feature Master */}
      <h1>Feature Master Dictionary</h1>
      <div className="form-row">
        <input
          type="text"
          placeholder="Feature Name"
          value={newFeature.name}
          onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
        />
        
        <input
          type="text"
          placeholder="Description"
          value={newFeature.description || ""}
          onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
        />
        <select
          value={newFeature.category}
          onChange={(e) => setNewFeature({ ...newFeature, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option>Safety</option>
          <option>Comfort</option>
          <option>Infotainment</option>
        </select>
        {editFeatureId ? (
          <>
            <button className="btn" onClick={updateFeature}>Update Feature</button>
            <button className="btn cancel" onClick={() => {
              setEditFeatureId(null);
              setNewFeature({ name: "", category: "", description: "" });
            }}>Cancel</button>
          </>
        ) : (
          <button className="btn" onClick={addFeature}>+ Add Feature</button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.map(f => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td>{f.category}</td>
              <td>{f.description}</td>
              <td>
                <button onClick={() => startEditFeature(f)}>Edit</button>
                <button onClick={() => deleteFeature(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vehicle Master */}
      <h1>Vehicle Model Year Master</h1>
      <div className="form-row">
        <input
          type="text"
          placeholder="Vehicle Name"
          value={newVehicle.name}
          onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Model Year"
          value={newVehicle.modelYear}
          onChange={(e) => setNewVehicle({ ...newVehicle, modelYear: e.target.value })}
        />
        <button className="btn" onClick={addVehicle}>+ Add Vehicle</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Model Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(vehicles) && vehicles.map(v => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.modelYear}</td>
              <td>
                <button onClick={() => deleteVehicle(v.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
