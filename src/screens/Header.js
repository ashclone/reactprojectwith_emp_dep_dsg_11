import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to="/home" class="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/about" class="nav-link">
                About
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/employee" class="nav-link">
                Employee
              </Link>
            </li>
          </ul>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
