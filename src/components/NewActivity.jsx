import React, { useState } from "react";
import { createActivity } from "../api/activities";
import useAuth from "../hooks/useAuth";

// this component is responsible for creating new routine and is displayed on the right-hand side of the *Routine page//

const NewActivity = () => {
  const { token, isLoggedIn, activities, setActivities } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
 
  return (
    <div className="newactivity-page">
      {/* The below form is only displayed when the user is logged in */}
      {!isLoggedIn ? (
        <div className="newactivity-form">
          Please log in/register to create new activities.
        </div>
      ) : (
        <>
          <form
            className="newactivity-form"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const routineObj = {
                  name,
                  description,
                  count,
                  duration,
                };
                const response = await createActivity(routineObj, token);
                let newArr = [response, ...activities];
                setActivities(newArr);
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
            <label>Description</label>
            <textarea
              placeholder="New description here"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <label>Count</label>
            <textarea
              placeholder="New count here"
              value={count}
              onChange={(e) => {
                setCount(e.target.value);
              }}
            /><label>Duration</label>
            <textarea
              placeholder="New duration here"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default NewActivity;
