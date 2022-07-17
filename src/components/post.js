import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import moment from 'moment';
import {useSelector} from 'react-redux'
import { ThemeContext } from "../contexts.js/theme";
import { useContext } from "react";



function Post({post}) {

  const users = useSelector(state => state.users)

  const { currentMode, mode } = useContext(ThemeContext);
  

  return (
    <Card className="m-5 border-0">
      <Card.Header as="h5"className={`${currentMode ? mode.fourthLight : mode.thirdDark}`} >Posted by: {users.map(user => user.id === post.userId && user.name)}</Card.Header>
      <Card.Body className={`${currentMode ? mode.thirdLight : mode.fourthDark}`}>
        <Card.Title>{post.title}</Card.Title>
        <div>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
        <Card.Text>{post.body}</Card.Text>
        <p>{post.comments.length}comments</p>
        <Button variant="primary" >
          <Link to={"/post/" + post.id} className="text-white"> Read More </Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Post;
