import { API_URL } from "./ajaxHelpers";


export async function fetchPosts() {
    try {
      const response = await fetch(`${APIURL}posts`);
      const data = await response.json();
      return data.data.posts;
    } catch (err) {
      throw err;
    }
  }

  export async function createPost(postObj, token) {
    const response = await fetch(`${APIURL}posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: postObj.title,
          description: postObj.description,
          location: postObj.location,
          price: postObj.price,
          willDeliver: postObj.willDeliver,
        },
      }),
    });
    const data = await response.json();
    return data;
  }

  export async function deletePost(postId, token) {
    const response = await fetch(`${APIURL}posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  export async function editPost(editPostObj, postId, token) {
    const response = await fetch(`${APIURL}posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: editPostObj.title,
          description: editPostObj.description,
          price: editPostObj.price,
          location: editPostObj.location,
          willDeliver: editPostObj.willDeliver,
        },
      }),
    });
    const data = await response.json();
    console.log(data)
    return data;
  }