import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import PostDetails from "./pages/postDetails";
import Login from "./pages/login";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./actions/posts.actions";
import { getUsers } from "./actions/users.actions";
import axios from "axios";

function App() {
  

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    axios
      .get("https://api.tawwr.com/posts")
      .then((posts) => dispatch(getPosts(posts.data.data)));
  }, [posts]);

  const getUsersA = async () => {
    try {
      const users = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(getUsers(users.data));
    } catch (error) {}
  };
  useEffect(() => {
    getUsersA();
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login/> }/> 
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
      
    </div>
  );
}

export default App;
