import React, { useState } from "react";
import deleteTrash from "./images/deleteTrash.png";
import editPencil from "./images/editPencil.png";
import mailIcon from "./images/mailIcon.png";
import { sendMessage, deletePost } from "../api/ajaxHelpers";
import EditPostCard from "./EditPostCard";

const SinglePost = ({ post, token, isLoggedIn, username, posts, setPosts }) => {
  const [message, setMessage] = useState("");
  const [clickedMessage, setClickedMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const postCard = (
    <>
      {/* this postCard is the main framework for the individual posts */}
      <h3 className="post-title">{post.title}</h3>
      <h4 className="post-username">Posted by: {post.author.username}</h4>
      <br />
      <h5 className="post-location">Location: {post.location}</h5>
      <h6 className="post-deliver">
        Will deliver? {post.willDeliver ? "Yes" : "No"}
      </h6>

      <br />
      <h5 className="post-price">Price: {post.price}</h5>
      <br />
      <p className="post-content">{post.description}</p>
      <br />
      <span className="post-time">
        <p className="post-created">
          Created On: {new Date(post.createdAt).toLocaleString()}
        </p>
        {post.updatedAt !== post.createdAt ? (
          <p className="post-updated">
            Last Updated On: {new Date(post.updatedAt).toLocaleString()}
          </p>
        ) : null}
      </span>
      <br />
    </>
  );
  const messageForm = (
    // this form is for sending messages
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message, post._id, token);
        setClickedMessage(false);
        setMessageSent(true);
      }}
    >
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="submit">Send</button>
    </form>
  );
  const postButtons = (
    // these are the buttons that also contain the edit post form and component link
    <>
      {/* If user is logged in and is not the post author, display Message button only */}
      <div className="button-container">
        {isLoggedIn && post.author.username !== username ? (
          <button
            className="post-button"
            id="message"
            onClick={(e) => {
              e.preventDefault();
              setClickedMessage(!clickedMessage);
            }}
          >
            {<img src={mailIcon} alt="message icon" />} Message
          </button>
        ) : null}
        {/* If user is logged in and is the post author, display Edit and Delete */}
        {isLoggedIn && post.author.username === username ? (
          <>
            {/* the Edit button functions are in the file EditPostCard.jsx */}
            <button
              className="post-button"
              id="edit"
              onClick={(e) => {
                e.preventDefault();
                setClickedEdit(!clickedEdit);
              }}
            >
              {<img src={editPencil} alt="pencil icon" />} Edit
            </button>
            <button
              className="post-button"
              id="delete"
              onClick={(e) => {
                e.preventDefault();
                deletePost(post._id, token);
                const filteredPosts = posts.filter((postObj) => {
                  return postObj._id !== post._id;
                });
                setPosts(filteredPosts);
              }}
            >
              {<img src={deleteTrash} alt="trash icon" />}Delete
            </button>
          </>
        ) : null}
      </div>
      {/* This is form for editing a post and will only display if user is logged in and clicks the edit button*/}
      <div className="editpost-form">
        {clickedEdit ? (
          <EditPostCard
            setClickedEdit={setClickedEdit}
            posts={posts}
            setPosts={setPosts}
            token={token}
            post={post}
          />
        ) : null}
      </div>
      <div className="message-form">{clickedMessage ? messageForm : null}</div>
      <div className="message-sent">{messageSent ? "Message Sent" : null}</div>
    </>
  );
  return (
    <div className="post-card">
      {postCard}
      {postButtons}
    </div>
  );
};

export default SinglePost;
