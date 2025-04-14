import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Missing from './Missing';

const Editpost = ({
  posts,handleEdit,updateBody,setUpdateBody,updateTitle,setUpdateTitle
}) => {

  const {id}=useParams();
  const post=posts.find(post=>(post.id).toString()===id);

  useEffect(()=>{
    if(post){
      setUpdateTitle(post.title);
      setUpdateBody(post.body);
    }
  },[post,setUpdateBody,setUpdateTitle])

  return (
    <main className="newPost">
      {updateTitle && 
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) =>{
            e.preventDefault()
            handleEdit(post.id)
            }}>
            <label htmlFor="postTotle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={updateTitle}
              onChange={(e) => {
                setUpdateTitle(e.target.value);
              }}
            />

            <label htmlFor="postBody">Post:</label>
            <textarea
              type="text"
              id="postBody"
              required
              value={updateBody}
              onChange={(e) => {
                setUpdateBody(e.target.value);
              }}
            />
            <button type="submit" >Submit</button>

            
          </form>
        </>
      }
      {
        !updateTitle &&
        <Missing/>
      }
    </main>
  );

};
  

export default Editpost