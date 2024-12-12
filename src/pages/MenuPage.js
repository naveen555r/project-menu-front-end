import React, { useState, useEffect } from "react";
import { getMenus, getMenuItems } from "../services/api"; // Assuming these API functions exist
import "../App.css";

const MenuPage = () => {
  const [menus, setMenus] = useState([]); // Stores list of menus
  const [selectedMenuId, setSelectedMenuId] = useState(null); // Stores selected menu ID
  const [menuItems, setMenuItems] = useState([]); // Stores items of the selected menu

  // Fetch menus on page load
  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getMenus(); // Fetch the menus from the backend
      setMenus(data);
    };

    fetchMenus();
  }, []); // Only runs once on page load

  // Fetch menu items for the selected menu
  const handleMenuClick = async (menuId) => {
    setSelectedMenuId(menuId); // Set the selected menu ID
    const items = await getMenuItems(menuId); // Fetch items for the selected menu
    setMenuItems(items);
  };

  return (
    <div>
      <h1>Menu List</h1>

      <div className="menu-list">
        {menus.length === 0 ? (
          <p>No menus available.</p>
        ) : (
          menus.map((menu) => (
            <div key={menu._id} className="menu-item" onClick={() => handleMenuClick(menu._id)}>
              <h2>{menu.name}</h2>
              {selectedMenuId === menu._id && (
                <div>
                  <p><strong>Description:</strong> {menu.description}</p> {/* Displaying menu description */}
                  {menuItems.length > 0 ? (
                    <ul>
                      {menuItems.map((item) => (
                        <li key={item._id}>
                          <strong>{item.name}</strong>: {item.description} - ${item.price}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No items available for this menu.</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuPage;
