import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import deleteTrash from "./images/deleteTrash.png";
import editPencil from "./images/editPencil.png";
import { deleteActivity } from "../api/activities";
import EditActivity from "./EditActivity";

const SingleActivity = ({ activity }) => {
  const [isLoggedIn] = useState("");
  const { token } = useAuth();
  const [username] = useState("");
  const [activities, setActivities] = useState([]);
  const [clickedEdit, setClickedEdit] = useState(false);
  const activityCard = (
    <>
      {/* this activityCard is the main framework for the individual activities */}
      <h3 className="activity-name">{activity.name}</h3>

      <h5 className="activity-goal">Description: {activity.description}</h5>
    </>
  );

  // const activityButtons = (
  //   // these are the buttons that also contain the edit activity form and component link
  //   <>
  //     {/* If user is logged in and is the activity author, display Edit and Delete */}
  //     {isLoggedIn && activity.creatorName === username ? (
  //       <>
  //         {/* the Edit button functions are in the file EditActivity.jsx */}
  //         <button
  //           className="activity-button"
  //           id="edit"
  //           onClick={(e) => {
  //             e.preventDefault();
  //             setClickedEdit(!clickedEdit);
  //           }}
  //         >
  //           {<img src={editPencil} alt="pencil icon" />} Edit
  //         </button>
  //         <button
  //           className="activity-button"
  //           id="delete"
  //           onClick={(e) => {
  //             e.preventDefault();
  //             deleteActivity(activity._id, token);
  //             const filteredActivities = activities.filter((activityObj) => {
  //               return activityObj._id !== activity._id;
  //             });
  //             setActivities(filteredActivities);
  //           }}
  //         >
  //           {<img src={deleteTrash} alt="trash icon" />}Delete
  //         </button>
  //       </>
  //     ) : null}
  //     {/*</div>
  //      This is form for editing a routine and will only display if user is logged in and clicks the edit button*/}
  //     <div className="editactivity-form">
  //       {clickedEdit ? (
  //         <EditActivity
  //           setClickedEdit={setClickedEdit}
  //           activities={activities}
  //           setActivities={setActivities}
  //           token={token}
  //           activity={activity}
  //         />
  //       ) : null}
  //     </div>
  //   </>
  // );
  return (
    <div className="activity-card">
      {activityCard}
      {/* {activityButtons} */}
    </div>
  );
};

export default SingleActivity;
