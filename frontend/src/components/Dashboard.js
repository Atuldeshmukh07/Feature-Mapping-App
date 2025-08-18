import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"

const STATUS_COLOR = {
  "Applicable": { background: "#d4edda", color: "#155724" },
  "Not-Applicable": { background: "#f8d7da", color: "#721c24" },
  "Under-Review": { background: "#fff3cd", color: "#856404" },
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:8080/api/mappings").then((response) => {
      setData(response.data);
    });
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      try {
        await axios.delete(`http://localhost:8080/api/mappings/${id}`);
        setData(data.filter((mapping) => mapping.id !== id));
      } catch (error) {
        console.error("Error deleting mapping:", error);
        alert("Failed to delete mapping!");
      }
    }
  };

  // Start editing
  const handleEdit = (mapping) => {
    setEditingId(mapping.id);
    setEditForm({ ...mapping });
  };

  // Save edited mapping
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/mappings/${id}`, editForm);
      setData(
        data.map((m) => (m.id === id ? { ...m, ...editForm } : m))
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating mapping:", error);
      alert("Failed to update mapping!");
    }
  };

  return (
    <div className="dashboard">
      <h2>Applicability Dashboard</h2>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Feature</th>
            <th>Market</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((mapping) => {
            const statusStyle =
              STATUS_COLOR[mapping.status] || {
                background: "#e2e3e5",
                color: "#383d41",
              };

            const isEditing = editingId === mapping.id;

            return (
              <tr key={mapping.id}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.vehicleName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, vehicleName: e.target.value })
                      }
                    />
                  ) : (
                    mapping.vehicleName
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.featureName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, featureName: e.target.value })
                      }
                    />
                  ) : (
                    mapping.featureName
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.marketName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, marketName: e.target.value })
                      }
                    />
                  ) : (
                    mapping.marketName
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                    >
                      {Object.keys(STATUS_COLOR).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: statusStyle.background,
                        color: statusStyle.color,
                      }}
                    >
                      {mapping.status}
                    </span>
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <>
                      <button
                        className="save-btn"
                        onClick={() => handleSave(mapping.id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(mapping)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(mapping.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
