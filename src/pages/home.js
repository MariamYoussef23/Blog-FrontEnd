
import Posts from "../components/posts"
import {useContext} from 'react';
import {ThemeContext} from '../contexts.js/theme'

function Home ({postsList, users}) {
  const {mode} = useContext(ThemeContext)

  return (
    <div style={{...mode,}}>
        <Posts postsList={postsList} users={users}/>  
    </div>
  )
}

export default Home;
