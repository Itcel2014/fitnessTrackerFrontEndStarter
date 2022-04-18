import { API_URL } from "./ajaxHelpers";

export async function fetchRoutines() {
  try {
    const response = await fetch(`${API_URL}routines`);
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}

export async function createRoutine(routineObj, token) {
  const name = routineObj.name
  const goal = routineObj.goal
  const isPublic = routineObj.isPublic
  const response = await fetch(`${API_URL}routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      goal: goal,
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

export async function editRoutine(editRoutineObj, routine, token) {
  const response = await fetch(`${API_URL}routines/${routine.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: editRoutineObj.Name,
      goal: editRoutineObj.Goal,
      isPublic: editRoutineObj.isPublic,
    }),
  });

  const data = await response.json();

  return data;
}
