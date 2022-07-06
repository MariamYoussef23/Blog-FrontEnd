import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import moment from 'moment';

function Post({ post, users}) {

  return (
    <Card className="m-5">
      <Card.Header as="h5">{users.map(user => user.id === post.userId && user.name)}</Card.Header>
      <Card.Body>
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
