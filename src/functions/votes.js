// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getPosts } from "../actions/posts.actions";

// export const addVote = async (sign) => {
//   const dispatch = useDispatch();
//   let voteChange = {
//     userId: 10,
//     userVote: sign,
//   };
//   try {
//     const data = await axios.post(
//       `https://api.tawwr.com/posts/${id}/vote`,
//       voteChange
//     );
//     const posts = await axios.get("https://api.tawwr.com/posts");
//     dispatch(getPosts(posts.data.data));
//   } catch (error) {
//     console.error({ x: error });
//   }
// };
