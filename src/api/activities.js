import { API_URL } from "./ajaxHelpers";

export async function fetchActivities() {
  try {
    const response = await fetch(`${APIURL}activities`);
    const data = await response.json();
    return data.data.activities;
  } catch (err) {
    throw err;
  }
}

export async function createActivity(activityObj, token) {
  const response = await fetch(`${APIURL}activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: activityObj.name,
      description: activityObj.description,
    }),
  });
  const data = await response.json();
  return data;
}

export async function deleteActivity(activityId, token) {
  const response = await fetch(`${APIURL}activities/${activityId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function editActivity(editActivityObj, activityId, token) {
  const response = await fetch(`${APIURL}activities/${activityId}`, {
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
