import React, { useEffect, useRef } from 'react'

function NewPost({handleSubmit,postTitle,setPostTitle,postBody,setPostBody}) {

  const ref = useRef();
  useEffect(()=>{
    if(ref.current){
      ref.current.focus();
    }
  })
  
  return (
    <div className="newPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          required
          ref={ref}
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />

        <label htmlFor="postBody">Post:</label>
        <textarea
          type="text"
          id="postBody"
          required
          value={postBody}
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default NewPost