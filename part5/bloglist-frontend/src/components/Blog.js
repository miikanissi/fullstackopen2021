import React, {useState} from "react";
import PropTypes from "prop-types";

const Blog = ({blog, likeBlog, deleteBlog}) => {
  const [showFull, setShowFull] = useState(false);

  const showFullBlog = () => {
    return (
      <div>
        <p>URL: {blog.url}</p>
        <p>
          {blog.likes === 1 ? `${blog.likes} like` : `${blog.likes} likes`}
          <button className="like" onClick={() => likeBlog(blog.id, blog.likes)}>
            Like
          </button>
        </p>
        <p>User: {blog.user.name}</p>
        <button className="remove" onClick={() => deleteBlog(blog)}>
          Remove
        </button>
      </div>
    );
  };

  return (
    <div className="blog-container">
      <div className="blog-title">
        <strong>{blog.title}</strong>
        by <i>{blog.author}</i>
      </div>
      <button onClick={() => setShowFull(!showFull)}>
        {showFull ? "Hide" : "View"}
      </button>
      {showFull && showFullBlog()}
    </div>
  );
};

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }),
};

export default Blog;
