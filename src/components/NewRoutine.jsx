import React, { useState, useEffect } from "react";
import { createRoutine } from "../api/routines";
import useAuth from "../hooks/useAuth";

// this component is responsible for creating new routine and is displayed on the right-hand side of the *Routine page//

const NewRoutine = () => {
  const { token, isLoggedIn, routines, setRoutines } = useAuth();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [activities, setActivities] = useState("");

    
  return (
    <div className="newroutine-page">
      {/* The below form is only displayed when the user is logged in */}
      {!isLoggedIn ? (
        <div className="newroutine-form">
          Please log in/register to create new routines.
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
                  isPublic,
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
            <label>Private ? </label>
            <input
              type="checkbox"
              onChange={(e) => {
                setIsPublic(false);
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
