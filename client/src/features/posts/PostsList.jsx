import React, { useState, useEffect } from "react";
import { API_URL } from "../../../constants";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null); 

  // Fetch posts from the API
  useEffect(() => {
    async function loadPosts(){
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred. Awkward...");
        console.log("An error occurred:", e);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-body">{post.body}</p>
          {/* <p className="post-date">{Date(post.created_at).split("GMT+0300 (Eastern European Summer Time)")}</p> */}
          <p className="post-date">{Date(post.created_at).split(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\s.+/)}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;