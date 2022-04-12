import React, { useEffect, useState } from "react";
import { fetchRoutines } from "../api/routines";

// this component displays a search bar above the routines section and filters the routines based on keywords

const Search = ({ routines, setRoutines }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);
  const [clickedClear, setClickedClear] = useState(false);

  function routineMatches(routine, searchTerm) {
    //update according to the API
    if (
      routine.name.includes(searchTerm) ||
      routine.goal.includes(searchTerm) ||
      routine.creatorName.includes(searchTerm) ||
      routine.activities.includes(searchTerm)
    ) {
      return true;
    }
  }

  // The useEffects below display the filtered results and allows a clear button to return the state to all routines
  useEffect(() => {
    const filteredRoutinesArray = routines.filter((routine) =>
      routineMatches(routine, searchTerm)
    );
    setRoutines(filteredRoutinesArray);
  }, [clickedSearch]);

  useEffect(() => {
    const getRoutines = async () => {
      const routinesArray = await fetchRoutines();
      setRoutines(routinesArray);
    };
    getRoutines();
  }, [clickedClear]);

  return (
    <form
      id="search"
      onSubmit={async (event) => {
        event.preventDefault();
        setClickedSearch(!clickedSearch);
      }}
    >
      <label htmlFor="keywords">Search</label>
      <input
        id="keywords"
        type="text"
        placeholder="enter keyword..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button type="submit">SEARCH</button>
      <button
        onClick={() => {
          setClickedClear(!clickedClear);
        }}
      >
        CLEAR
      </button>
    </form>
  );
};

export default Search;
