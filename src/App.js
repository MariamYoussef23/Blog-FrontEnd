import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import PostDetails from "./pages/postDetails";


function App() {
  const [postsList, setPostsList] = useState([]);
  const setNewList = (newList) => setPostsList(newList);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const users = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(users.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    axios
      .get("https://api.tawwr.com/posts")
      .then((postsList) => setPostsList(postsList.data.data));
  }, []);

  return (
    <div >
        
        <NavBar setNewList={setNewList} />
        <Routes>
          <Route
            path="/"
            element={<Home postsList={postsList} users={users} />}
          />
          <Route
            path="/post/:id"
            element={
              <PostDetails
                postsList={postsList}
                users={users}
                setNewList={setNewList}
              />
            }
          />
        </Routes>

    </div>
  );
}

export default App;
