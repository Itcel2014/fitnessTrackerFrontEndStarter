import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchRoutines } from "../api/routines";
import { SingleRoutine } from "./";
import Search from "./Search";

// The routines section displays all routines from the API
const Routines = () => {
  const [isLoggedIn] = useState("");
  const { token } = useAuth();
  const [username] = useState("");
  const [routines, setRoutines] = useState([]);
  useEffect(() => {
    const getRoutines = async () => {
      const routinesArray = await fetchRoutines();
      setRoutines(routinesArray);
    };
    getRoutines();
  }, [setRoutines]);

  return (
    <div className="routine-page">
      {/* the Search component is displayed here */}
      <Search routines={routines} setRoutines={setRoutines} />

      {routines.map((routine, i) => {
        // the below section displays the individual routines
        return (
          <SingleRoutine
            key={i}
            routine={routine}
            token={token}
            isLoggedIn={isLoggedIn}
            username={username}
            routines={routines}
            setRoutines={setRoutines}
          />
        );
      })}
    </div>
  );
};

export default Routines;
