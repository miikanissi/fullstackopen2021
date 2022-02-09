import React, {useState, useEffect, useRef} from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [update, setUpdate] = useState(null);

  const [user, setUser] = useState(null);

  const blogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [update]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  // LOGIN
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({
        text: `${user.name} logged in.`,
        type: "success",
      });
    } catch (exception) {
      setMessage({
        text: "Wrong username or password. Please try again.",
        type: "error",
      });
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUser");
    setMessage({
      text: "Logout successful.",
      type: "success",
    });
    setUser(null);
  };

  // CREATE BLOG
  const createBlog = async (blogObject) => {
    try {
      blogRef.current.toggleVisibility();
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));
      setMessage({
        text: `A new blog ${response.title} by ${response.author} added.`,
        type: "success",
      });
    } catch (exception) {
      // simply show exception from backend as error
      setMessage({
        text: `${exception}`,
        type: "error",
      });
    }
  };

  // DELETE BLOG
  const deleteBlog = async (blog) => {
    const result = window.confirm(`Remove a blog ${blog.title} by ${blog.author}.`);

    if (result) {
      await blogService.remove({
        id: blog.id,
      });
      setUpdate(Math.floor(Math.random() * 1000));
    }
  };

  // LIKE BLOG
  const likeBlog = async (id, likes) => {
    await blogService.update({
      id: id,
      likes: likes + 1,
    });
    setUpdate(Math.floor(Math.random() * 1000));
  };

  // LOGIN FORM
  const loginForm = () => (
    <Togglable buttonLabel="Log in">
      <LoginForm
        handleSubmit={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={({target}) => setUsername(target.value)}
        handlePasswordChange={({target}) => setPassword(target.value)}
      />
    </Togglable>
  );

  const userInfo = () => (
    <div>
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
    </div>
  );

  // BLOG FORM
  const blogForm = () => (
    <Togglable buttonLabel="Create Blog" ref={blogRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <div>
          <h2>Log in.</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          {userInfo()}
          {blogForm()}
          {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
            blogs.map((blog) => (
              <Blog
                blog={blog}
                likeBlog={likeBlog}
                deleteBlog={deleteBlog}
                key={blog.id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
