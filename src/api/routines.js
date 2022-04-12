import { API_URL } from "./ajaxHelpers";

export async function fetchRoutines() {
  try {
    const response = await fetch(`${API_URL}routines`);
    const data = await response.json();
    return data.data.routines;
  } catch (err) {
    throw err;
  }
}

export async function createRoutine(routineObj, token) {
  const response = await fetch(`${API_URL}routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: routineObj.name,
      goal: routineObj.goal,
      isPublic: routineObj.isPublic,
    }),
  });
  const data = await response.json();
  return data;
}

export async function deleteRoutine(routineId, token) {
  const response = await fetch(`${API_URL}routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function editRoutine(editRoutineObj, routineId, token) {
  const response = await fetch(`${APIURL}routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: editRoutineObj.name,
      goal: editRoutineObj.goal,
      isPublic: editRoutineObj.isPublic,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
}
