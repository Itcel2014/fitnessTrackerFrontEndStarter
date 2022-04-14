import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import deleteTrash from "./images/deleteTrash.png";
import editPencil from "./images/editPencil.png";
import { deleteRoutine } from "../api/routines";
import EditRoutine from "./EditRoutine";

const SingleRoutine = ({routine}) => {
  const [isLoggedIn] = useState("");
  const { token } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [clickedEdit, setClickedEdit] = useState(false);

  console.log("routine:", routine)
  const routineCard = (
    <>
      {/* this routineCard is the main framework for the individual routines */}
      <h3 className="routine-name">{routine.name}</h3>
      <h4 className="routine-creatorName">Posted by: {routine.creatorName}</h4>
      <br />
      <h5 className="routine-goal">Goal: {routine.goal}</h5>

      <br />
      {/** map through activites and render each actitiy */}
      <h5 className="routine-activities">Activities: {routine.activities.length} activites</h5>
      <br />
      <p className="routine-duration">Duration:{routine.duration}</p>
      <br />
      <p className="routine-count">Count:{routine.count}</p>
      <br />
      <span className="routine-time">
        <p className="routine-created">
          Created On: {new Date(routine.createdAt).toLocaleString()}
        </p>
        {routine.updatedAt !== routine.createdAt ? (
          <p className="routine-updated">
            Last Updated On: {new Date(routine.updatedAt).toLocaleString()}
          </p>
        ) : null}
      </span>
      <br />
    </>
  );

  // const routineButtons = (
  //   // these are the buttons that also contain the edit routine form and component link
  //   <>
  //     {/* If user is logged in and is the routine author, display Edit and Delete */}
  //     {isLoggedIn && routine.creatorName === username ? (
  //       <>
  //         {/* the Edit button functions are in the file EditRoutine.jsx */}
  //         <button
  //           className="routine-button"
  //           id="edit"
  //           onClick={(e) => {
  //             e.preventDefault();
  //             setClickedEdit(!clickedEdit);
  //           }}
  //         >
  //           {<img src={editPencil} alt="pencil icon" />} Edit
  //         </button>
  //         <button
  //           className="routine-button"
  //           id="delete"
  //           onClick={(e) => {
  //             e.preventDefault();
  //             deleteRoutine(routine._id, token);
  //             const filteredRoutines = routines.filter((routineObj) => {
  //               return routineObj._id !== routine._id;
  //             });
  //             setRoutines(filteredRoutines);
  //           }}
  //         >
  //           {<img src={deleteTrash} alt="trash icon" />}Delete
  //         </button>
  //       </>
  //     ) : null}
  //     {/*</div>
  //      This is form for editing a routine and will only display if user is logged in and clicks the edit button*/}
  //     <div className="editroutine-form">
  //       {clickedEdit ? (
  //         <EditRoutine
  //           setClickedEdit={setClickedEdit}
  //           routines={routines}
  //           setRoutines={setRoutines}
  //           token={token}
  //           routine={routine}
  //         />
  //       ) : null}
  //     </div>
  //   </>
  // );
  return (
    <div className="routine-card">
      {routineCard}
      {/* {routineButtons}  */}
    </div>
  );
};

export default SingleRoutine;
