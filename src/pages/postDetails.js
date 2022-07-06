import { useParams } from "react-router-dom";
import moment from "moment";
import PostComment from "../components/postComment";
import Card from "react-bootstrap/Card";
import axios from "axios";

function postDetails({ postsList, setNewList }) {
  const { id } = useParams();

  const post = postsList.find((post) => post.id === +id);
  if (!post) {
    return <h1>Post not Found </h1>;
  }
  
  const addVote = async (sign) => {
      let voteChange ={
        userId: 10,
        userVote: sign 
      }
      try {
        const data = await axios.post(`https://api.tawwr.com/posts/${id}/vote`, voteChange);
        const newList = await axios.get("https://api.tawwr.com/posts");
        setNewList(newList.data.data);
      } catch (error) {
          console.error({x: error})
      }
  }



  return (
    <div>
      <h1>{post.title}</h1>

      <button onClick={()=> addVote(1)}>UpVote</button>
      <button onClick={() => addVote(-1)}>DownVote</button>

      <p>Post made by: User {post.userId} </p>
      <p>{post.body}</p>
      <p>{moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
      <PostComment post={post} id={id} setNewList={setNewList} />
      <>
        <div>
          {post.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <Card body className="m-4">
                  User: {comment.userId}
                  {comment.body}
                </Card>
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
}

export default postDetails;
