import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../constants";

function PostEditForm() {
  const [ post, setPost ] = useState(null);
  const { id } = useParams();
  const [, setLoading ] = useState(true);
  const [, setError ] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch the current post by id
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          throw response
        }
      } catch (e) {
        console.error("An error occured:", e);
        setError(e);
      } finally {
        setLoading(false);
        };
      };
      fetchCurrentPost();
    }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body,
        }),
  });
  if (response.ok) {
    const json = await response.json();
    console.log("Success:", json);
    navigate(`/posts/${id}`);
  } else {
    throw response;
  }
} catch (e) {
  console.error("An error occured:", e);
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