import React, { useEffect, useState } from "react";
import { fetchActivities } from "../api/activities";

// this component displays a search bar above the routines section and filters the routines based on keywords

const SearchActivities = ({ activities, setActivities }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);
  const [clickedClear, setClickedClear] = useState(false);

  function activityMatches(activity, routine, searchTerm) {
    //update according to the API
    if (
      activity.name.includes(searchTerm) ||
      activity.description.includes(searchTerm) ||
      routine.creatorName.includes(searchTerm) ||
      routine.activities.includes(searchTerm)
    ) {
      return true;
    }
  }

  // The useEffects below display the filtered results and allows a clear button to return the state to all routines
  useEffect(() => {
    const filteredActivitiesArray = activities.filter((activity) =>
      activityMatches(activity, searchTerm)
    );
    setActivities(filteredActivitiesArray);
  }, [clickedSearch]);

  useEffect(() => {
    const getActivities = async () => {
      const activitiesArray = await fetchActivities();
      setActivities(activitiesArray);
    };
    getActivities();
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

export default SearchActivities;