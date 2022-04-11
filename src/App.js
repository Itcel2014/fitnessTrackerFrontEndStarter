import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import alienIcon from "./images/alienIcon.png";
import { Posts, Navbar, NewPost, Profile, Login, Register } from "./components";
// need to change Posts, NewPost, Profile, add Activity

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routines, setRoutines] = useState([]);
  // need to change posts to routines
  const [token, setToken] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  // userRoutines
  const [userMessages, setUserMessages] = useState([]);
  // userMessages should not be used

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);

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
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
        setPassword={setPassword}
        setToken={setToken}
        isLoggedIn={isLoggedIn}
      />
      <br />
      <div className="container">
        {/* The below section displays the different routes available for display*/}
        <Switch>
          <Route exact path="/">
            <Routines
            // from Posts
              routines={routines}
              setRoutines={setRoutines}
              isLoggedIn={isLoggedIn}
              token={token}
              username={username}
            />
            <NewRoutine
            // NewPosts needs to change to new routines
              routines={routines}
              setRoutines={setRoutines}
              isLoggedIn={isLoggedIn}
              token={token}
              username={username}
            />
          </Route>

          <Route path="/routines">
            <Routines
            // from Posts
              routines={routines}
              setRoutines={setRoutines}
              isLoggedIn={isLoggedIn}
              token={token}
              username={username}
            />
            <NewRoutines
              routines={routines}
              setRoutines={setRoutines}
              isLoggedIn={isLoggedIn}
              token={token}
              username={username}
            />
          </Route>

          <Route path="/activities">
            <Activities
            // new
              userPosts={userPosts}
              setUserPosts={setUserPosts}
              isLoggedIn={isLoggedIn}
              token={token}
              username={username}
              setUsername={setUsername}
              userMessages={userMessages}
              setUserMessages={setUserMessages}
              setToken={setToken}
            />
          </Route>
          <Route path="/myRoutines">
            <MyRoutines
            // from profile
              userPosts={userPosts}
              setUserPosts={setUserPosts}
              isLoggedIn={isLoggedIn}
              token={token}
              username={username}
              setUsername={setUsername}
              userMessages={userMessages}
              setUserMessages={setUserMessages}
              setToken={setToken}
            />
          </Route>

          <Route path="/login">
            <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
            />
          </Route>

          <Route path="/register">
            <Register
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App
