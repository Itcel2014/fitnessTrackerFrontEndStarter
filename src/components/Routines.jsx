import React, {  useEffect } from "react";
import { fetchRoutines } from "../api/ajaxHelpers";
// change fetchPosts to fetchRoutines
import { SingleRoutine } from "./";
// change SinglePost to SingleRoutine
import Search from "./Search";

// The posts section displays all posts from the API
const Routines = ({ routines, setRoutines, isLoggedIn, token, username }) => {
  useEffect(() => {
    const getRoutines = async () => {
      const routinesArray = await fetchRoutines();
      setPosts(routinesArray);
    };
    getRoutines();
  }, [setRoutines]);

  return (
    <div className="routine-page">
      {/* the Search component is displayed here */}
      <Search routines={routines} setRoutines={setRoutines} />

      {routines.map((routine, i) => {
        // the below section displays the individual posts
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
