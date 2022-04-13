import React, { useState, useEffect } from "react";
import deleteTrash from "./images/deleteTrash.png";
import editPencil from "./images/editPencil.png";
import { deleteRoutine } from "../api/routines";
import { fetchUserData } from "../api/users";
import EditRoutine from "./EditRoutine";
import useAuth from "../hooks/useAuth";

const MyRoutines = ({
  userRoutines,
  setUserRoutines,
  isLoggedIn,
  token,
  username,
  setUsername,
  userActivities,
  setUserActivites,
}) => {
  const { user } = useAuth();
  const [routineDeleted, setRoutineDeleted] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);

  // The below useEffect is responsible for retrieving and filtering the user's routine and activities
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (isLoggedIn) {
          const response = await fetchUserData(token);
          setUserRoutines(response.data.routines);
          setUserActivites(response.data.activities);
          setUsername(response.data.username);
        }
      } catch (err) {
        console.error("There was an issue retrieving user information", err);
      }
    };
    getUserData();
  }, []);

  // The Profile page will only display if the user is logged in
  // The below sections display both the user's routines and the user's activities
  return (
    <>
      {!isLoggedIn ? (
        <div className="routines-page">
          Please log in/register to create routines or activities.
        </div>
      ) : (
        <div className="myroutines-page">
          {/* This section is used to display the User's routines */}
          <div className="routine-page">
            {userRoutines.length === 0 ? (
              <h2>No Routines Yet</h2>
            ) : (
              userRoutines.map((routine) => {
                return (
                  <div className="routine-card" key={routine._id}>
                    {!routine.active ? (
                      <>
                        <h3
                          className="routine-name"
                          style={{
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                          }}
                        >
                          {routine.name}
                        </h3>
                        <p style={{ color: "red" }}>Routine Deleted</p>
                      </>
                    ) : (
                      <h3 className="routine-name">{routine.name}</h3>
                    )}
                    <h5 className="routine-creatorName">
                      Creator Name: {routine.creatorName}
                    </h5>

                    <br />
                    <h5 className="routine-activities">
                      Activities: {routine.activities}
                    </h5>
                    <br />
                    <p className="routine-goal">{routine.goal}</p>
                    <br />
                    <span className="routine-time">
                      <p className="routine-created">
                        Created On:{" "}
                        {new Date(routine.createdAt).toLocaleString()}
                      </p>
                      {routine.updatedAt !== routine.createdAt ? (
                        <p className="routine-updated">
                          Last Updated On:{" "}
                          {new Date(routine.updatedAt).toLocaleString()}
                        </p>
                      ) : null}
                    </span>
                    <br />
                    <div className="button-container">
                      {!routine.active ? null : (
                        <>
                          <button
                            className="routine-button"
                            id="edit"
                            onClick={(e) => {
                              e.preventDefault();
                              setClickedEdit(!clickedEdit);
                            }}
                          >
                            {<img src={editPencil} alt="pencil icon" />}Edit
                          </button>
                          <button
                            className="routine-button"
                            id="delete"
                            onClick={(e) => {
                              e.preventDefault();
                              setRoutineDeleted(true);
                              deleteRoutine(routine._id, token);
                            }}
                          >
                            {<img src={deleteTrash} alt="trash icon" />}Delete
                          </button>
                        </>
                      )}
                    </div>
                    {/* the below section opens the EditRoutine form */}
                    <div className="editRoutine-form">
                      {clickedEdit ? (
                        <EditRoutine
                          setClickedEdit={setClickedEdit}
                          routines={userRoutines}
                          setRoutines={setUserRoutines}
                          token={token}
                          routine={routine}
                        />
                      ) : null}
                    </div>
                    <div className="routine-deleted">
                      {routineDeleted ? "Routine Deleted" : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* This section is used to display activities created by the user */}
          {/* <div className="message-page">
            {userMess.length === 0 ? (
              <h2>No Messages Yet</h2>
            ) : (
              userMessages.map((message, i) => {
                return (
                  <div className="message-card" key={i}>
                    <h3>Post: {message.post.title}</h3>
                    <h4>From: {message.fromUser.username}</h4>
                    <br />
                    <p>{message.content}</p>
                    <br /> */}
                    {/* This section is to open the Reply form to messages directed to the user */}
                    {/* {userMessages[i].fromUser.username === username ? null : (
                      <Messages token={token} message={message} />
                    )}
                  </div>
                );
              })
            )}
          </div> */}
        </div>
      )}
    </>
  );
};

export default MyRoutines;
