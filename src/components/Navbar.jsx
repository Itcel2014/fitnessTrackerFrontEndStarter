import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { setToken, isLoggedIn, setIsLoggedIn } = useAuth();


  const logoutButton = (
    <li>
      <Link
        to="/"
        onClick={() => {
          setIsLoggedIn(false);
          setToken("");
          localStorage.removeItem('token');
        }}
      >
        Logout
      </Link>
    </li>
  );
  const logInRegisterButtons = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/routines">Routines</Link>
        </li>
        <li>
          <Link to="/activities">Activities</Link>
        </li>
        <li>
          <Link to="/MyRoutines">My Routines</Link>
        </li>
        {!isLoggedIn ? logInRegisterButtons : logoutButton}
      </ul>
    </nav>
  );
};

export default Navbar;
