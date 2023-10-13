import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";


function PostEditForm() {
  const [ post, setPost ] = useState(null);
  const { id } = useParams();
  const [, setLoading ] = useState(true);
  const [, setError ] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        setPost(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title: post.title,
      body: post.body,
    };
    try {
      const response = await updatePost(id, updatedPost);
      navigate(`/posts/${response.id}`);
    } catch (e) {
      console.error("An error occurred: ", e);
    }
  };
  
  if (!post) return <h2>Loading...</h2>;
  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="title-label">Title</label>
          <br />
          <input 
            type="text" 
            id="post-title"
            className="title-form" 
            value={post.title} 
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="body" className="body-label">Body</label>
          <br />
          <textarea
            id="post-body"
            className="body-form"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
        </div>
        <div>
          <button type="submit" className="submit-button">Save</button>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm;