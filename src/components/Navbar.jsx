import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  setIsLoggedIn,
  setUsername,
  setPassword,
  setToken,
  isLoggedIn,
}) => {
  const logoutButton = (
    <li>
      <Link
        to="/"
        onClick={() => {
          setIsLoggedIn(false);
          setUsername("");
          setPassword("");
          setToken("");
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
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/profile">User Profile</Link>
        </li>

        {!isLoggedIn ? logInRegisterButtons : null}
        {isLoggedIn ? logoutButton : null}
      </ul>
    </nav>
  );
};

export default Navbar;
