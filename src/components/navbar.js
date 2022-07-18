import PostForm from "./postForm";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts.js/theme";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/login.actions";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import reddit_logo_light from "../images/reddit_logo_light.png";
import reddit_logo_dark from "../images/reddit_logo_dark.png";
import userImg from "../images/userImg.jpeg"
import { IoIosMoon } from "react-icons/io";
import { IoSunny  } from "react-icons/io5";


function NavBar() {
  const loggedIn = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modes, mode, modeSwitch, currentMode } = useContext(ThemeContext);

  return (
   <div className={`container-fluid ${currentMode ? mode.primaryLight : mode.primaryDark} px-5 `}>
      <Navbar className="d-flex justify-content-between">
        <Link
          className={`mx-2 text-decoration-none ${
            currentMode ? "text-black" : "text-white"
          }`}
          to="/"
          >
          <Image
            src={` ${currentMode ? reddit_logo_light : reddit_logo_dark}`}
            height={25}
          ></Image>
        </Link>
        <div className="d-flex justify-content-between">

          <div>
          <Link className="mx-2" to="/">
            {" "}
            <PostForm />{" "}
          </Link>
          </div>

          <div>
          {loggedIn ? (
            <Link to="/">
              {" "}
              < div  className="mx-2" onClick={() => dispatch(logout())}>
                <Image  src={userImg}roundedCircle height={38}></Image>{" "}
              </div>
            </Link>
          ) : (
            
            <Link to="/Login">
              <Button className="mx-2" style={{color:"white",backgroundColor: "#ff5700", border:"#ff5700"}}>logIn</Button>
            </Link>
          )}
          </div>

          <div>
          <div onClick={() => modeSwitch(currentMode)}>
            {currentMode ? <IoIosMoon size={30} style={{color:"#ff5700" }}/> : <IoSunny size={30} style={{color:"#ff5700" }}/> }
          </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;
