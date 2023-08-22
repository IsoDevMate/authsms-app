
import {supabase} from './client'
import { useState,useEffect } from 'react';
import './index.css'
const App=()=> {
//manage local state //handle life cycle methods
//handle posts from the supabase client 
const [posts,setPosts]=useState([])
//handle user input as they type in their post
const[post,setPost]=useState([{title:"",content:""}])
const{title,content}=post
//invoke the useEffect to handle life cycle methods
useEffect(()=>{
    FetchPosts()
},[])

const FetchPosts=async()=>{
        const { data } = await supabase.from("posts").select();
        //set the posts array from posts returned from supabase backend
        setPosts(data);
        console.log("data ",data)
      } 
//insert  a post of the user  from the frontend
const CreatePost=async()=>{
    await supabase.from("posts").insert([{title,content}])
    //call the setPost to set the post fields
    .single()
    setPost({title:'',content:''})
    //call the FetchPost to update the UI
    FetchPosts()
}
return(
    <>
     <div className="App">
<input
placeholder='Title'
value={title}
onChange={ e =>setPost({...post,title:e.target.value})}
 />
<input
placeholder='Content'
value={content}
onChange={ e =>setPost({...post,content:e.target.value})}
 />
<button >{CreatePost}</button>
{   posts.map(post=>(
    <div className="display" key={posts.id }>
   <h3>{post.title}</h3>
   <p>{post.content}</p>
    </div>
))
}
</div>
    </>
   
)
}
export default App

