
import Posts from "../components/posts"
import {useContext} from 'react';
import {ThemeContext} from '../contexts.js/theme'


function Home () {
  const {mode } =useContext(ThemeContext)
  
  return (
    <div style={{...mode,}}>
        <Posts  />  
    </div>
  )
}

export default Home;
