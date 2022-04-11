import { useState } from "react";
import { editPost } from "../api/ajaxHelpers";
import React from "react";

const EditRoutine = ({ token, post, posts, setPosts, setClickedEdit }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editWillDeliver, setEditWillDeliver] = useState(false);

  // the below return statement is the drop-down fillable form for editing posts
  // each item is wrapped inside of ternarys to allow for optional editing
  
  return (
    <>
      <form
        className="editpost-form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const editPostObj = {
              title: editTitle !== "" ? editTitle : post.title,
              description:
                editDescription !== "" ? editDescription : post.description,
              price: editPrice !== "" ? editPrice : post.price,
              location: editLocation !== "" ? editLocation : post.location,
              willDeliver:
                editWillDeliver === post.willDeliver
                  ? post.willDeliver
                  : editWillDeliver,
            };
            const response = await editPost(editPostObj, post._id, token);
            const editedPost = response.data.post;
            const filteredPosts = posts.filter((postObj) => {
              return postObj._id !== editedPost._id;
            });
            const newArr = [editedPost, ...filteredPosts];
            setPosts(newArr);
            setClickedEdit(false);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <label>Edit Title</label>
        <input
          type="text"
          placeholder="Optional edited title"
          value={editTitle}
          onChange={(e) => {
            setEditTitle(e.target.value);
          }}
        />
        <label>Edit Description</label>
        <textarea
          placeholder="Optional edited description"
          value={editDescription}
          onChange={(e) => {
            setEditDescription(e.target.value);
          }}
        />
        <label>Edit Price</label>
        <input
          type="text"
          placeholder="Optional edited price"
          value={editPrice}
          onChange={(e) => {
            setEditPrice(e.target.value);
          }}
        />
        <label>Edit Location</label>
        <input
          type="text"
          placeholder="Optional edited location"
          value={editLocation}
          onChange={(e) => {
            setEditLocation(e.target.value);
          }}
        />
        <label>Edit Will Deliver?</label>
        <input
          type="checkbox"
          onChange={() => {
            setEditWillDeliver(true);
          }}
        />
        <button type="submit">Edit Post</button>
      </form>
    </>
  );
};

export default EditRoutine;