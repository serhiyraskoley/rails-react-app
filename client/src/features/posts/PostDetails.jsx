import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { API_URL } from "../../../constants";


function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams(true);
  const navigate = useNavigate();
  
  useEffect(() => {
     const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
        } catch (e){
          console.log("An error occurred:", e);
        }
      };
     fetchCurrentPost();
  }, [id]);

  const deletePost = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        throw response;
      }
    } catch (e) {
      // console.error("An error occurred:", e);
      console.error("Error from the post details page:", e);
    }
  }
  
  if (!post) return <h2>Loading...</h2>;

  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <p className="post-date">{Date(post.created_at).split(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\s.+/)}</p>
      <Link to="/">Back to Posts</Link>
      {" | "}
      <button onClick={deletePost} className="submit-button">Delete</button>
    </div>
  );
}

export default PostDetails;