import React, { useState, useEffect } from "react";
import { createRoutine } from "../api/routines";
import useAuth from "../hooks/useAuth";


// this component is responsible for creating new routine and is displayed on the right-hand side of the *Routine page//

const NewRoutine = () => {
  const { token, user, isLoggedIn} = useAuth();
  const [routines, setRoutines] = useState([]);
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
                };
                const response = await createRoutine(routineObj, token);
                let newArr = [response, ...routines];
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
              value={name}
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
            {/* <label>Activities</label> */}
            {/* <input
              type="text"
              placeholder="Activities"
              value={activities}
              onChange={(e) => {
                setActivities(e.target.value);
              }}
            /> */}
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default NewRoutine;
