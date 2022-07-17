import PostForm from "./postForm";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts.js/theme";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus } from "../actions/login.actions";

function NavBar() {
  const loggedIn = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();

  const { modes, mode, modeSwitch, currentMode } = useContext(ThemeContext);

  return (
    <div className={` ${currentMode ? mode.primaryLight : mode.primaryDark}`}>
      <Navbar
        className= "d-flex justify-content-between" 
      >
        <Link className={`mx-5 text-decoration-none ${currentMode ? 'text-black': 'text-white'}`} to="/">
          Blog Home
        </Link>
        <div>
          <Link className="mx-5" to="/">
            {" "}
            <PostForm />{" "}
          </Link>
          <Link to="/" > <button
            onClick={() => {
              dispatch(loginStatus(loggedIn),console.log(loggedIn));
            }}
          >
            {loggedIn && <>Logout</>}
          </button> </Link>
          <button onClick={() => modeSwitch(currentMode)}>
            {currentMode ? <>Dark Mode</> : <>Light Mode</>}
          </button> 
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;
