import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { editRoutine } from "../api/routines";
import React from "react";

const EditRoutine = ({ routine, routines, setRoutines, setClickedEdit }) => {
  const { token } = useAuth();
  const [editName, setEditName] = useState("");
  const [editGoal, setEditGoal] = useState("");
  const [editIsPublic, setIsPublic] = useState(true);
  const [editCreatorName, setEditCreatorName] = useState("");
  const [editActivities, setEditActivities] = useState("");

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
              // IsPublic: editIsPublic !== "" ? editIsPublic : routine.isPublic,
            };

            const response = await editRoutine(editRoutineObj, routine, token);
            // console.log("here", editRoutineObj);
            // console.log("hii", routine);
            // console.log("hay", routine.id);

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
        {/* look for Edit Ispublic and checkboxes from stranger's things */}
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
