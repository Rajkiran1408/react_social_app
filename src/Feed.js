import React from 'react'
import Post from './Post'

function Feed({posts}) {
  return (
    <div>
        {posts.map((post)=>(
            <Post key={post.id} post={post}/>
            // <p>{post.body}</p>
        ))}
    </div>
  )
}

export default Feed