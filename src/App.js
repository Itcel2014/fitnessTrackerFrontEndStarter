import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import alienIcon from "./images/alienIcon.png";
import {
  Routines,
  Activities,
  Navbar,
  NewRoutine,
  MyRoutines,
  Login,
  Register,
} from "./components";
import useAuth from "./hooks/useAuth";
// need to change Posts, NewPost, Profile, add Activity

function App() {
  const { user, isLoggedIn, setIsLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  // userRoutines

  // useEffect(() => {
  //   const localStorageToken = localStorage.getItem("token");
  //   if (localStorageToken) {
  //     setToken(localStorageToken);
  //   }
  // }, []);

  return (
    <div className="app">
      <header>
        <h1>Fitness Tracker</h1>
        <h2>Move Your Body!</h2>
        {isLoggedIn ? (
          <div className="is-logged-in">
            <img src={alienIcon} alt="user icon" />
            {username}
          </div>
        ) : null}
      </header>
      {/* The below section links to the Navbar component */}
      <Navbar isLoggedIn={setIsLoggedIn} />
      <br />
      <div className="container">
        {/* The below section displays the different routes available for display*/}
        <Routes>
          <Route exact path="/" element={<Routines />} />

          <Route path="/routines" element={<Routines />} />

          <Route path="/activities" element={<Activities />} />

          <Route path="/myRoutines" element={<MyRoutines />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
