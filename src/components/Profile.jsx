import React, { useState, useEffect } from "react";
import deleteTrash from "./images/deleteTrash.png";
import editPencil from "./images/editPencil.png";
import { fetchUserData, deletePost } from "../api/ajaxHelpers";
import Messages from "./Messages";
import EditPostCard from "./EditPostCard";


const Profile = ({
  userPosts,
  setUserPosts,
  isLoggedIn,
  token,
  username,
  setUsername,
  userMessages,
  setUserMessages,

}) => {
  const [profilePostDeleted, setProfilePostDeleted] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);

  // The below useEffect is responsible for retrieving and filtering the user's posts and messages
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (isLoggedIn) {
          const response = await fetchUserData(token);
          setUserPosts(response.data.posts);
          setUserMessages(response.data.messages);
          setUsername(response.data.username);
        }
      } catch (err) {
        console.error("There was an issue retrieving user information", err);
      }
    };
    getUserData();
  }, []);

  // The Profile page will only display if the user is logged in
  // The below sections display both the user's posts and the user's messages
  return (
    <>
      {!isLoggedIn ? (
        <div className="post-page">
          Please log in/register to create posts or send messages.
        </div>
      ) : (
        <div className="profile-page">
          {/* This section is used to display the User's Posts */}
          <div className="post-page">
            {userPosts.length === 0 ? (
              <h2>No Posts Yet</h2>
            ) : (
              userPosts.map((post) => {
                return (
                  <div className="post-card" key={post._id}>
                    {!post.active ? (
                      <>
                        <h3
                          className="post-title"
                          style={{
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                          }}
                        >
                          {post.title}
                        </h3>
                        <p style={{ color: "red" }}>Post Deleted</p>
                      </>
                    ) : (
                      <h3 className="post-title">{post.title}</h3>
                    )}
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
                          Last Updated On:{" "}
                          {new Date(post.updatedAt).toLocaleString()}
                        </p>
                      ) : null}
                    </span>
                    <br />
                    <div className="button-container">
                      {!post.active ? null : (
                        <>
                          <button
                            className="post-button"
                            id="edit"
                            onClick={(e) => {
                              e.preventDefault();
                              setClickedEdit(!clickedEdit);
                            }}
                          >
                            {<img src={editPencil} alt="pencil icon" />}Edit
                          </button>
                          <button
                            className="post-button"
                            id="delete"
                            onClick={(e) => {
                              e.preventDefault();
                              setProfilePostDeleted(true);
                              deletePost(post._id, token);
                            }}
                          >
                            {<img src={deleteTrash} alt="trash icon" />}Delete
                          </button>
                        </>
                      )}
                    </div>
                    {/* the below section opens the EditPost form */}
                    <div className="editpost-form">
                      {clickedEdit ? (
                        <EditPostCard
                          setClickedEdit={setClickedEdit}
                          posts={userPosts}
                          setPosts={setUserPosts}
                          token={token}
                          post={post}
                        />
                      ) : null}
                    </div>
                    <div className="post-deleted">
                      {profilePostDeleted ? "Post Deleted" : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* This section is used to display Messages sent to the user */}
          <div className="message-page">
            {userMessages.length === 0 ? (
              <h2>No Messages Yet</h2>
            ) : (
              userMessages.map((message, i) => {
                return (
                  <div className="message-card" key={i}>
                    <h3>Post: {message.post.title}</h3>
                    <h4>From: {message.fromUser.username}</h4>
                    <br />
                    <p>{message.content}</p>
                    <br />
                    {/* This section is to open the Reply form to messages directed to the user */}
                    {userMessages[i].fromUser.username === username ? null : (
                      <Messages token={token} message={message} />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;