import { useSelector} from "react-redux"
import Post from './post'


function Posts() {

  

 
  
  const posts = useSelector( state => state.posts)
  
  return (
    <div>
      {posts.length > 0 ? posts?.map((post) => {
        return (
            <Post key={post.id} post={post} />
        );
      }) : <p>Loading...</p>}

      {/* {posts?.map((post) => {
        return (
            <Post key={post.id} post={post}users={users} />
        );
      })}   */}    
    </div>
  );
}

export default Posts;
