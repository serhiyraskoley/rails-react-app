import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { fetchAllPosts, deletePost } from "../../services/postService";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null); 

  // Fetch posts from the API
  useEffect(() => {
    async function loadPosts(){
      try {
        const data = await fetchAllPosts();
        setPosts(data);
        setLoading(false);
    } catch {
        setError("An error occurred. Awkward...", e);
        setLoading(false);
    }
  }
    loadPosts();
  }, []);

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("An delete error occurred:", e);
      }
    };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2 className="post-title">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p className="post-body">{post.body}</p>
          <p className="post-date">{Date(post.created_at).split(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\s.+/)}</p>
          <div className="post-links">
            <button className="submit-button" onClick={() => deletePostHandler(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;