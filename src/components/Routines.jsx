import React, { useEffect, useState } from "react";
import { fetchRoutines } from "../api/routines";
import { SingleRoutine } from "./";
import Search from "./Search";

// The routines section displays all routines from the API
const Routines = () => {
  const [routines, setRoutines] = useState([]);
  
  useEffect(() => {
    const getRoutines = async () => {
      const routinesArray = await fetchRoutines();
      console.log(routinesArray, 'routinesArr')
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
        return <SingleRoutine key={i} routine={routine} />;
      })}
    </div>
  );
};

export default Routines;
