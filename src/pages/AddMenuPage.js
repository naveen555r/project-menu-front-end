import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMenu } from "../services/api"; // Assuming addMenu API function exists
import "../App.css";

const AddMenuPage = () => {
  const [menu, setMenu] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // To redirect after the menu is added

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({
      ...menu,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!menu.name || !menu.description) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      await addMenu(menu); // Assuming addMenu sends a POST request to add a menu
      setLoading(false);
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError("Failed to add menu. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="add-menu-page">
      <h1>Add New Menu</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Menu Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={menu.name}
            onChange={handleChange}
            placeholder="Enter menu name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={menu.description}
            onChange={handleChange}
            placeholder="Enter menu description"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenuPage;
