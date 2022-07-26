import { useParams } from "react-router-dom";
import moment from "moment";
import PostComment from "../components/postComment";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts.actions";
import { ThemeContext } from "../contexts.js/theme";
import { useContext } from "react";
import userImg from "../images/userImg.jpeg";
import Image from "react-bootstrap/Image";
import { AiOutlineComment } from "react-icons/ai";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import Button from "react-bootstrap/Button";
// import {addVote} from '../functions/votes'

function postDetails() {
  const { currentMode, mode } = useContext(ThemeContext);

  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const post = posts.find((post) => post.id === +id);
  if (!post) {
    return <h1>Post not Found </h1>;
  }

  const addVote = async (sign) => {
    let voteChange = {
      userId: 1,
      voteStatus: sign,
    };
    try {
      const data = await axios.post(
        `http://localhost:5000/posts/${id}/vote`,
        voteChange
      );
      const posts = await axios.get("http://localhost:5000/posts");
      dispatch(getPosts(posts.data.data));
    } catch (error) {
      console.error({ y: error });
    }
  };

  return (
    <div
      className={`container-fluid ${
        currentMode ? mode.secondaryLight : mode.secondaryDark
      }`}
    >
      <div className="py-1 px-5 ">
        <Card
          className={` border-0 w-50 my-5 ${
            currentMode ? mode.primaryLight : mode.primaryDark
          } `}
        >
          <div className="d-flex px-3 py-3 ">
            <div>
              <Image src={userImg} roundedCircle height={38}></Image>
            </div>
            <div className="mx-3">
              <div>
                <Card.Title>{post.title}</Card.Title>
              </div>
              <div>
                {users.map((user) => user.id === post.userId && user.name)} -
                {moment(post.createdAt).format("MMMM D")} at{" "}
                {moment(post.createdAt).format("h:mma")}
              </div>
            </div>
          </div>
          <hr className="m-0" style={{ color: "grey" }}></hr>
          <Card.Body>
            <Card.Text>{post.body}</Card.Text>
            <div className="d-flex ">
              <div className=" mx-2">
                <AiOutlineComment size={25} style={{ color: "#ff5700" }} />
                {post.comments.length}
              </div>
              <div className=" mx-2">
                <FaRegThumbsUp
                  onClick={() => addVote(1)}
                  style={{ color: "#ff5700" }}
                />
                {post.downVotesTotal}
              </div>
              <div className=" mx-2">
                <FaRegThumbsDown
                  onClick={() => addVote(-1)}
                  style={{ color: "#ff5700" }}
                />{" "}
                {post.upVotesTotal}
                {/* {console.log(post)} */}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card
        className={` border-0 w-50 m-5 ${
          currentMode ? mode.primaryLight : mode.primaryDark
        } `}
      >
        <Card.Title className="d-flex px-3 py-3 ">Comments</Card.Title>
        <hr className="m-0" style={{ color: "grey" }}></hr>
        <Card.Body>
          {post.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <div className="d-flex px-3 py-3 ">
                  <div>
                    <Image src={userImg} roundedCircle height={38}></Image>
                  </div>
                  <div>
                    User:{" "}
                    {users.map((user) => user.id === post.userId && user.name)}
                    <p>{comment.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <PostComment post={post} id={id} />
          </div>
        </Card.Body>
      </Card>

      {/* <div>
        {post.comments.map((comment) => {
          return (
            <div key={comment.id} className="row m-5">
              <Card
                body
                className="m-4"
                className={`${
                  currentMode ? mode.thirdLight : mode.thirdDark
                } col-6`}
              >
                User:{" "}
                {users.map((user) => user.id === post.userId && user.name)}
                <p>{comment.body}</p>
              </Card>
            </div>
          );
        })}
      </div> */}

      {/* <PostComment post={post} id={id} /> */}
    </div>
  );
}

export default postDetails;
