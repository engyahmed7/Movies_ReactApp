import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free"

export default function NavBar() {
  return (
    <>
      <nav className="d-flex justify-content-between align-items-center mt-3">
        <ul className="d-flex list-unstyled">
          <li className=" pe-4">
            <NavLink to="/home"> Home</NavLink>
          </li>
          <li className=" pe-4">
            <NavLink to="/tv">Tv</NavLink>
          </li>
          <li className="pe-4">
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>
        </ul>

        <ul className="d-flex align-items-center list-unstyled">
            <li className="px-2">
                <a href="http://www.instagram.com">
                    <i class="fa fa-facebook"></i>
                </a>
            </li>
            <li className="px-2">
                <a href="http://www.instagram.com">
                    <i class="fa fa-twitter"></i>
                </a>
            </li>
            <li className="px-2">
                <a href="http://www.instagram.com">
                    <i class="fa fa-instagram"></i>
                </a>
            </li>
            <li className="px-2">
                <NavLink to="/register">Register</NavLink>
            </li>
            <li className="px-2">
                <NavLink to="/login">Login</NavLink>
            </li>
            <li className="px-2">
                <NavLink to="/logout">Logout</NavLink>
            </li>

        </ul>
      </nav>
    </>
  );
}
