
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AddMenuPage from './pages/AddMenuPage';
import AddMenuItemPage from './pages/AddMenuItemPage';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <a href="/">Home</a> | <a href="/add-menu">Add Menu</a> |<a href="menu/:menuId/add-item">Add menu item</a>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu/:menuId" element={<MenuPage />} />
          <Route path="/add-menu" element={<AddMenuPage />} />
          <Route path="/menu/:menuId/add-item" element={<AddMenuItemPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

