import React, {  useEffect } from "react";
import { fetchPosts } from "../api/ajaxHelpers";
// change fetchPosts to fetchRoutines
import { SinglePost } from "./";
// change SinglePost to SingleRoutine
import Search from "./Search";

// The posts section displays all posts from the API
const Routines = ({ routines, setRoutines, isLoggedIn, token, username }) => {
  useEffect(() => {
    const getPosts = async () => {
      const postsArray = await fetchPosts();
      setPosts(postsArray);
    };
    getPosts();
  }, [setRoutines]);

  return (
    <div className="post-page">
        {/* remember to change classNames and update CSS */}
      {/* the Search component is displayed here */}
      <Search routines={routines} setRoutines={setRoutines} />

      {posts.map((post, i) => {
        // the below section displays the individual posts
        return (
          <SinglePost
            key={i}
            routine={routine}
            token={token}
            isLoggedIn={isLoggedIn}
            username={username}
            routines={routines}
            setRoutines={setRoutines}
          />
        );
      })}
    </div>
  );
};

export default Routines;
