import { useState } from "react";
import { editActivity } from "../api/activities";
import React from "react";

const UpdateActivity = ({
  token,
  activity,
  activities,
  setActivities,
  setClickedEdit,
}) => {
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  // const [editActivities, setActivities] = useState("");
  

  // the below return statement is the drop-down fillable form for editing activities
  // each item is wrapped inside of ternarys to allow for optional editing

  return (
    <>
      <form
        className="editActivity-form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const editActivityObj = {
              Name: editName !== "" ? editName : activity.name,
              Description: editDescription !== "" ? editDescription : activity.description,
            };
            const response = await editActivity(
              editActivityObj,
              activity._id,
              token
            );
            const editedActivity = response.data.activity;
            const filteredActivities = activities.filter((activityObj) => {
              return activityObj._id !== editedActivity._id;
            });
            const newArr = [editedActivity, ...filteredActivities];
            setActivities(newArr);
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
        <label>Edit Description</label>
        <textarea
          placeholder="Optional edited description"
          value={editDescription}
          onChange={(e) => {
            setEditDescription(e.target.value);
          }}
        />
        <button type="submit">Edit Activity</button>
      </form>
    </>
  );
};

export default UpdateActivity;