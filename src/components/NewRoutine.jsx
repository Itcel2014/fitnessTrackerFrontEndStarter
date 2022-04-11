import React, { useState, useEffect } from "react";
import { createRoutine } from "../api/ajaxHelpers";

// this component is responsible for creating new routine and is displayed on the right-hand side of the *Routine page//

const NewRoutine = ({ token, routines, setRoutines, isLoggedIn }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [activities, setActivities] = useState("");

  return (
    <div className="newroutine-page">
      {/* The below form is only displayed when the user is logged in */}
      {!isLoggedIn ? (
        <div className="newroutine-form">
          Please log in/register to create routines or send messages.
        </div>
      ) : (
        <>
          <form
            className="newroutine-form"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const routineObj = {
                  name,
                  goal,
                  activities,
                };
                const response = await createRoutine(routineObj, token);
                let newArr = [...routines, response.data.routine];
                setRoutines(newArr);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <label>Name</label>
            <input
              type="text"
              placeholder="New Name here"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label>Goal</label>
            <textarea
              placeholder="New goal here"
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value);
              }}
            />
            <label>Activities</label>
            <input
              type="text"
              placeholder="Activities"
              value={activities}
              onChange={(e) => {
                setActivities(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default NewRoutine;
