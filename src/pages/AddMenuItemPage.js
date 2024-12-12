import React, { useState, useEffect } from "react";
import { getMenus } from "../services/api"; // Import API function for fetching menus
import { addMenuItem } from "../services/api"; // Import API function for adding menu items
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const AddMenuItemPage = () => {
  const [menus, setMenus] = useState([]); // State to store available menus
  const [selectedMenuId, setSelectedMenuId] = useState(""); // State to store selected menu ID
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch available menus when the page loads
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
      } catch (error) {
        setError("Failed to load menus.");
      }
    };
    fetchMenus();
  }, []);

  // Handle input field changes for item data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle menu selection
  const handleMenuSelect = (e) => {
    setSelectedMenuId(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMenuId || !itemData.name || !itemData.description || !itemData.price) {
      setError("Please fill all fields and select a menu.");
      return;
    }

    setLoading(true);
    try {
      // Add the menu item to the selected menu
      await addMenuItem(selectedMenuId, itemData);
      setItemData({ name: "", description: "", price: "" }); // Clear form fields
      setError(""); // Clear error message
      navigate("/"); // Navigate to the homepage after successful addition
    } catch (error) {
      setError("Failed to add menu item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-menu-item-page">
      <h2>Add Menu Item</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Dropdown to select a menu */}
        <div>
          <label htmlFor="menu">Select Menu</label>
          <select
            id="menu"
            value={selectedMenuId}
            onChange={handleMenuSelect}
            required
          >
            <option value="">Select a menu</option>
            {menus.map((menu) => (
              <option key={menu._id} value={menu._id}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>

        {/* Menu Item Name */}
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

        {/* Menu Item Description */}
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

        {/* Menu Item Price */}
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

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItemPage;
