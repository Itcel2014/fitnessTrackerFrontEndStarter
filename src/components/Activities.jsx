import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchActivities } from "../api/activities";
import { SingleActivity } from "./";
// import Search? or add a SearchActivity?
import SearchActivities from "./SearchActivities";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [isLoggedIn] = useState(false);
  const { token } = useAuth();
  const [username] = useState("");

  useEffect(() => {
    const getActivities = async () => {
      const activitiesArray = await fetchActivities();
      setActivities(activitiesArray);
    };
    getActivities();
  }, [setActivities]);

  return (
    <div className="routine-page">
      {/* the Search component is displayed here */}
      <SearchActivities activities={activities} setActivities={setActivities} />

      {activities.map((activity, i) => {
        // the below section displays the individual activities
        return <SingleActivity key={i} activity={activity} />;
      })}
    </div>
  );
};

export default Activities;
