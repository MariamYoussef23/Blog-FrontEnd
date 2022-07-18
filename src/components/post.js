import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { ThemeContext } from "../contexts.js/theme";
import { useContext } from "react";
import userImg from "../images/userImg.jpeg";
import Image from "react-bootstrap/Image";
import { AiOutlineComment } from "react-icons/ai";


function Post({ post }) {
  const users = useSelector((state) => state.users);
  const loggedIn = useSelector((state) => state.loginStatus);

  const { currentMode, mode } = useContext(ThemeContext);

  return (
    <div>
      <Card
        className={`m-5 border-0 w-50 ${
          currentMode ? mode.primaryLight : mode.primaryDark
        } `}
      >
        <div className="d-flex px-3 py-3 ">
          <div>
            <Image src={userImg} roundedCircle height={38}></Image>
          </div>
          <div className="mx-3">
            <div>
              {" "}
              {users.map((user) => user.id === post.userId && user.name)}
            </div>
            <div>
              on {moment(post.createdAt).format("MMMM D")} at{" "}
              {moment(post.createdAt).format("h:mma")}
            </div>
          </div>
        </div>
        <hr className ="m-0" style={{color:"grey"}} ></hr>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>

          <div className="d-flex justify-content-between">
            <div>
              {post.comments.length}
              <AiOutlineComment size={25} style={{ color: "#ff5700" }} />

            </div>

            <div >
              <Link
                to={loggedIn ? "/post/" + post.id : "/Login"}
              >
                <Button className="mx-2" style={{color:"white",backgroundColor: "#ff5700", border:"#ff5700"}}>Read More</Button>
                
              </Link>
            </div>

          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Post;
