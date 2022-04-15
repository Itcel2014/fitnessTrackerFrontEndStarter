import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { editRoutine } from "../api/routines";
import { fetchActivities } from "../api/activities";
import React from "react";
import { Activities } from ".";

const EditRoutine = ({ routine, setClickedEdit }) => {
  const { token } = useAuth();
  const [editName, setEditName] = useState("");
  const [editGoal, setEditGoal] = useState("");
  const [editIsPublic, setIsPublic] = useState(true);
  const [editActivities, setEditActivities] = useState("");
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity]= useState('');
 

  useEffect(() => {
    const getActivities = async () => {
      const activitiesArray = await fetchActivities();
      setActivities(activitiesArray);
    };
    getActivities();
  }, [setActivities]);
  // the below return statement is the drop-down fillable form for editing routines
  // each item is wrapped inside of ternarys to allow for optional editing

  return (
    <>
      <form
        className="editRoutine-form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const editRoutineObj = {
              Name: editName !== "" ? editName : routine.name,
              Goal: editGoal !== "" ? editGoal : routine.goal,
              IsPublic:
                editIsPublic === routine.isPublic
                  ? routine.isPublic
                  : editIsPublic,
            };

            const response = await editRoutine(editRoutineObj, routine, token);

            const editedRoutine = response.data;
            const filteredRoutines = routines.filter((routineObj) => {
              return routineObj.id !== editedRoutine.id;
            });
            const newArr = [editedRoutine, ...filteredRoutines];
            setRoutines(newArr);
            setClickedEdit(false);
          } catch (error) {
            console.error(error);
          }
        }}
      >
         <br />
         <br />
        <label>Edit Name</label>
        <input
          type="text"
          placeholder="Optional edited name"
          value={editName}
          onChange={(e) => {
            setEditName(e.target.value);
          }}
        />
      <br />
      <br />
        <label>Edit Goal</label>
        <textarea
          placeholder="Optional edited goal"
          value={editGoal}
          onChange={(e) => {
            setEditGoal(e.target.value);
          }}
        />
         <br />
         <br />
        <label>Edit Activities</label>
        {/* look for Edit Ispublic and checkboxes from stranger's things */}
        <br></br>
        <br />
        <fieldset>
          <label htmlFor="select-activity">
            Activity{" "}
            <span className="activity-count">
              ({activities.length})
            </span>
          </label>
          <select
            name="activity"
            id="select-activity"
            value={activity}
            onChange={(event) => {
              setEditActivities(event.target.value);
            }}
          >
            <option value="any">Any</option>
            {/* map over the activityList, return an <option /> */}
            {activities.map((activity, index) => {
              return (
                <option key={index} value={activity.name}>
                  {activity.name}
                </option>
              );
            })}
          </select>
        </fieldset>
        <br></br>
        <input
          type="dropdown"
          placeholder="Optional edited activities"
          value={editActivities}
          onChange={(e) => {
            setEditActivities(e.target.value);
          }}
        />
        <br/>
        <br></br>
        <label>Private ? </label>
        {/* look for Edit Ispublic and checkboxes from stranger's things */}
        <input
          type="checkbox"
          onChange={(e) => {
            setIsPublic(false);
          }}
        />
        <button type="submit">Edit Routine</button>
        <br></br>
      </form>
    </>
  );
};

export default EditRoutine;
