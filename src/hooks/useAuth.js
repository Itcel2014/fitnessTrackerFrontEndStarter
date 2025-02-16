import { useContext } from "react";
import AuthContext from "../AuthContext";

// const context = useContext(AuthContext)

const useAuth = () => {
  const { user, setUser, token, setToken, isLoggedIn, setIsLoggedIn, routines, setRoutines } =
    useContext(AuthContext);

  return {
    user,
    setUser,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    routines,
    setRoutines,
  };
};

export default useAuth;
