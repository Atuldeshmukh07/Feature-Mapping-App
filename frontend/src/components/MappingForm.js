import React, { useState, useEffect } from "react";
import "./mapping.css";

function Mapping() {
  const [features, setFeatures] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    featureId: "",
    vehicleId: "",
    marketId: "",
    status: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const featuresRes = await fetch("http://localhost:8080//api/features");
        const marketsRes = await fetch("http://localhost:8080//api/markets");
        const vehiclesRes = await fetch("http://localhost:8080//api/vehicle-models"); // correct URL

        if (!featuresRes.ok || !marketsRes.ok || !vehiclesRes.ok) {
          throw new Error("Failed to fetch one or more dropdowns");
        }

        const featuresData = await featuresRes.json();
        const marketsData = await marketsRes.json();
        const vehiclesData = await vehiclesRes.json(); // ✅

        setFeatures(featuresData);
        setMarkets(marketsData);
        setVehicles(vehiclesData); // ✅
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dropdown data from server");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const [featuresRes, vehiclesRes, marketsRes] = await Promise.all([
  //         fetch("http://localhost:8080//api/features"),
  //         fetch("http://localhost:8080//api/vehicle-models"),
  //         fetch("http://localhost:8080//api/markets"),
  //       ]);

  //       if (!featuresRes.ok || !vehiclesRes.ok || !marketsRes.ok) {
  //         throw new Error("Failed to fetch one or more dropdowns");
  //       }

  //       const featuresData = await featuresRes.json();
  //       const vehiclesData = await vehiclesRes.json();
  //       const marketsData = await marketsRes.json();

  //       // Directly use the arrays returned by your backend
  //       setFeatures(featuresData);
  //       setVehicles(vehiclesData);
  //       setMarkets(marketsData);

  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //       setError("Failed to load dropdown data from server");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.featureId || !formData.vehicleId || !formData.marketId || !formData.status) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080//api/mappings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Mapping saved successfully!");
        setFormData({
          featureId: "",
          vehicleId: "",
          marketId: "",
          status: "",
        });
      } else {
        alert("Failed to save mapping");
      }
    } catch (err) {
      console.error("Error saving mapping:", err);
    }
  };

  if (loading) return <p>Loading dropdowns...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="mapping-container">
      <h2>Mapping</h2>
      <form className="mapping-form" onSubmit={handleSubmit}>
        <label>Feature:</label>
        <select name="featureId" value={formData.featureId} onChange={handleChange}>
          <option value="">Select Feature</option>
          {features.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        <label>Vehicle Model:</label>
        <select name="vehicleId" value={formData.vehicleId} onChange={handleChange}>
          <option value="">Select Vehicle</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.modelYear})
            </option>
          ))}
        </select>

        <label>Market:</label>
        <select name="marketId" value={formData.marketId} onChange={handleChange}>
          <option value="">Select Market</option>
          {markets.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="Applicable">Applicable</option>
          <option value="Not-Applicable">Not Applicable</option>
          <option value="Under-Review">Under Review</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Mapping;
