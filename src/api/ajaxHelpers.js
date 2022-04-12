// You can choose to import all your functions, and re-export them here
export const API_URL = "http://fitnesstrac-kr.herokuapp.com/api/";


export async function fetchQueryResults({ queryString }) {
  const url = `${API_URL}/keyword=${queryString}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}





