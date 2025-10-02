import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="shop-name">🛒 Al-Qaim Shop</h1>
      <p className="tagline">Welcome to our grocery store system</p>
      <div className="buttons">
        <Link to="/shopkeeper">
          <button className="portal-btn">Shopkeeper Portal</button>
        </Link>
        <Link to="/salesman">
          <button className="portal-btn">Salesman Portal</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
