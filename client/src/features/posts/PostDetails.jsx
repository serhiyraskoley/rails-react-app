import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { fetchPost, deletePost } from "../../services/postService";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams(true);
  const navigate = useNavigate();
  
  useEffect(() => {
     const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        setPost(json);
        } catch (e){
          console.log("An error occurred:", e);
        }
      };
     fetchCurrentPost();
  }, [id]);

  const deletePostHandler = async () => {
    try {
      await deletePost(id);
      navigate("/");
    } catch (e) {
      console.error("Failed to delete post: ", e);
    }
  }
  
  if (!post) return <h2>Loading...</h2>;

  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <p className="post-date">{Date(post.created_at).split(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\s.+/)}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
      <br />
      <Link to="/">Back to Posts</Link>
      {" | "}
      <button onClick={deletePostHandler} className="submit-button">Delete</button>
    </div>
  );
}

export default PostDetails;