import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import { fetchUserData } from "../api/users";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("token")) {
        // Pretend this is from a fetchUser()
        console.log("token", localStorage.getItem("token"));
        const newUser = await fetchUserData(localStorage.getItem("token"));
        setUser(newUser);
        setIsLoggedIn(true);
        setToken(localStorage.getItem("token"));
      } else {
        setUser({});
      }
    }
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
