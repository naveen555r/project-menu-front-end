
import React from 'react';
import { Link } from 'react-router-dom';

const MenuCard = ({ menu }) => {
  return (
    <div className="menu-card">
      <h3>{menu.name}</h3>
      <p>{menu.description}</p>
      <Link to={`/menu/${menu._id}`}>View Items</Link>
    </div>
  );
};

export default MenuCard;
