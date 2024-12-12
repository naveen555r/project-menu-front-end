import React, { useState } from "react";
import { addMenuItem } from "../services/api"; // Importing the API function for adding menu item

const AddMenuItem = ({ menuId, onItemAdded }) => {
  // State to handle form input
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemData.name || !itemData.description || !itemData.price) {
      setError("Please fill all the fields.");
      return;
    }

    setLoading(true);
    try {
      // Call the API function to add the menu item
      await addMenuItem(menuId, itemData);
      onItemAdded(); // Notify parent component to refresh menu items
      setItemData({ name: "", description: "", price: "" }); // Clear form
      setError(""); // Clear any errors
    } catch (error) {
      setError("Failed to add menu item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={itemData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={itemData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={itemData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;
