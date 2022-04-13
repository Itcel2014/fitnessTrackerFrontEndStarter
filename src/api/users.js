import { API_URL } from "./ajaxHelpers";

export async function fetchUserData(token) {
  try {
    const response = await fetch(`${API_URL}users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function registerUser(username, password) {
  try {
    const response = await fetch(`${API_URL}users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchUserToken(username, password) {
  try {
    const response = await fetch(`${API_URL}users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    return data.token;
  } catch (err) {
    throw err;
  }
}
