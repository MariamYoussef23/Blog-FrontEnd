import PostForm from "./postForm";
import Navbar from "react-bootstrap/Navbar";
import {Link} from 'react-router-dom'
import {useContext} from 'react';
import {ThemeContext} from '../contexts.js/theme'


function NavBar() {

  const {modeSwitch,currentMode } = useContext(ThemeContext)

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
        <Link className="mx-5 text-white text-decoration-none" to="/home">Blog Home</Link>
        <div>
        <Link className="mx-5" to="/home"> <PostForm /> </Link> 
        <button>{}</button>
        <button onClick={modeSwitch}>{currentMode === 'light'? <>Dark Mode</> : <>Light Mode</>}</button>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;

