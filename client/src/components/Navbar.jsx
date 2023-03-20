import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex" }}>
        <Link style={{ marginRight: "20px" }} to={`/`}>
          <h1>Pokemon List</h1>
        </Link>
        <Link to={`/mylistpage`}>
          <h1>My Pokemon List</h1>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
