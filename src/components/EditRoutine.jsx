import { useState } from "react";
import { EditRoutine } from "../api/ajaxHelpers";
import React from "react";

const EditRoutine = ({
  token,
  routine,
  routines,
  setRoutines,
  setClickedEdit,
}) => {
  const [editName, setEditName] = useState("");
  const [editGoal, setEditGoal] = useState("");
  const [editActivities, setActivities] = useState("");
  const [editCreatorName, setEditCreatorName] = useState("");

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
              creatorName:
                editCreatorName !== "" ? editCreatorName : routine.creatorName,
              Activities:
                editActivities !== "" ? editActivities : routine.activities,
            };
            const response = await editRoutine(
              editRoutineObj,
              routine._id,
              token
            );
            const editedRoutine = response.data.routine;
            const filteredRoutines = routines.filter((routineObj) => {
              return routineObj._id !== editedRoutine._id;
            });
            const newArr = [editedRoutine, ...filteredRoutines];
            setRoutines(newArr);
            setClickedEdit(false);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <label>Edit Name</label>
        <input
          type="text"
          placeholder="Optional edited name"
          value={editName}
          onChange={(e) => {
            setEditName(e.target.value);
          }}
        />
        <label>Edit Goal</label>
        <textarea
          placeholder="Optional edited goal"
          value={editGoal}
          onChange={(e) => {
            setEditGoal(e.target.value);
          }}
        />
        <label>Edit Activities</label>
        <input
          type="text"
          placeholder="Optional edited activities"
          value={editActivities}
          onChange={(e) => {
            setEditActivities(e.target.value);
          }}
        />

        <button type="submit">Edit Routine</button>
      </form>
    </>
  );
};

export default EditRoutine;
