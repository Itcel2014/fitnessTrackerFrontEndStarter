// You can choose to import all your functions, and re-export them here
export const APIURL = "https://fitnesstrac-kr.herokuapp.com/api/2202-FTB-ET-WEB-FT/";


export async function fetchQueryResults({ queryString }) {
  const url = `${APIURL}/keyword=${queryString}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}





