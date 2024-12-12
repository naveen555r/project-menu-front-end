const MenuItemCard = ({ item }) => {
    return (
      <div className="menu-item-card">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <p>${item.price}</p>
      </div>
    );
  };
  
  export default MenuItemCard;
  