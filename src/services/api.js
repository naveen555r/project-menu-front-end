

// api.js
import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Base URL for your backend API

// Fetch menus from the backend
export const getMenus = async () => {
  try {
    const response = await axios.get(`${API_URL}/menus`);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

// Fetch menu items based on the menu ID
export const getMenuItems = async (menuId) => {
  try {
    const response = await axios.get(`${API_URL}/menus/${menuId}/items`);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

// Add a new menu
export const addMenu = async (menuData) => {
  try {
    const response = await axios.post(`${API_URL}/menus`, menuData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the added menu data
  } catch (error) {
    console.error("Error adding menu:", error);
    throw error;
  }
};

// Add a new menu item to a specific menu
export const addMenuItem = async (menuId, itemData) => {
  try {
    const response = await axios.post(
      `${API_URL}/menus/${menuId}/items`,
      itemData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the added menu item data
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
};

// Update an existing menu item
export const updateMenuItem = async (menuId, itemId, itemData) => {
  try {
    const response = await axios.put(
      `${API_URL}/menus/${menuId}/items/${itemId}`,
      itemData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the updated menu item data
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

// Delete a menu item
export const deleteMenuItem = async (menuId, itemId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/menus/${menuId}/items/${itemId}`
    );
    return response.data; // Return the deleted item response
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};
