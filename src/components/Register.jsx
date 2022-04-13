import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { registerUser } from "../api/users";

const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="register-page">
      <h2>Welcome to Fitness Tracker!</h2>

      <div className="form-container">
        {/* The form below is the form that creates a new username and password */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const response = await registerUser(username, password);
              localStorage.setItem("token", response.token);
              setToken(response.token);
              console.log("lalalalalala", response.token);
              setIsLoggedIn(true);
            } catch (error) {
              console.error(
                "There was a problem with your registration.",
                error
              );
            }
          }}
        >
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Sign Up</button>
          {/* the below section only displays after a successful user registration */}
          <div
            className="login-confirmation"
            style={{
              display: isLoggedIn ? "block" : "none",
            }}
          >
            <h3>REGISTRATION COMPLETE!</h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
