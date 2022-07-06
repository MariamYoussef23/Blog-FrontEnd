
import Post from './post'

function Posts({ postsList, users}) {
  return (
    <div>
      {postsList.map((post) => {
        return (
            <Post key={post.id} post={post}users={users} />
        );
      })}      
    </div>
  );
}

export default Posts;
