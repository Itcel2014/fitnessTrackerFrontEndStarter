import React, { useEffect, useState } from "react";
import { fetchActivities } from "../api/activities";
import { SingleActivity } from "./";
// import Search? or add a SearchActivity?
import SearchActivities from "./SearchActivities";

const Activities = ({activities, setActivities, isLoggedIn, token, username}) => {
    useEffect(() => {
        const getActivities = async () => {
            const activitiesArray = await fetchActivities(); setActivities(activitiesArray);
        };
        getActivities();
    }, [setActivities]);

    return (
        <div className="routine-page">
        {/* the Search component is displayed here */}
        <SearchActivities activities={activities} setActivities={setActivities} />
  
        {activities.map((activity, i) => {
          // the below section displays the individual activities
          return (
            <SingleActivity
              key={i}
              activity={activity}
              token={token}
              isLoggedIn={isLoggedIn}
              username={username}
              activities={activities}
              setActivities={setActivities}
            />
          );
        })}
      </div>  
    );

};

export default Activities