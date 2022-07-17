import Posts from "../components/posts";
import { useContext } from "react";
import { ThemeContext } from "../contexts.js/theme";
import NavBar from "../components/navbar";
import PostDetails from "./postDetails";
import Login from "./login";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts.actions";
import { getUsers } from "../actions/users.actions";
import axios from "axios";

function Home() {
  const { currentMode, mode } = useContext(ThemeContext);
  
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  
  // const loggedIn = useSelector((state) => state.loginStatus)
  // console.log(loggedIn)

  useEffect(() => {
    axios
      .get("https://api.tawwr.com/posts")
      .then((posts) => dispatch(getPosts(posts.data.data)));
      
  }, []);

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
    <div className={`${currentMode ? mode.secondaryLight : mode.secondaryDark }`}>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
      <Posts /> 

  
      
    </div>
  );
}

export default Home;
