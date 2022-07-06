import PostForm from "./postForm";
import Navbar from "react-bootstrap/Navbar";
import {Link} from 'react-router-dom'
import {useContext} from 'react';
import {ThemeContext} from '../contexts.js/theme'
import {Button} from "react-bootstrap"
function NavBar({setNewList}) {

  const {modeSwitch,currentMode } = useContext(ThemeContext)

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
        <Link className="mx-5 text-white text-decoration-none" to="/">Blog Home</Link>
        <div>
        <Link className="mx-5" to="/"> <PostForm setNewList={setNewList}/> </Link> 
        <button onClick={modeSwitch}>{currentMode === 'light'? <>Dark Mode</> : <>Light Mode</>}</button>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;

