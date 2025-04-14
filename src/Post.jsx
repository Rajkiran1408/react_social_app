import React from 'react'
import { Link } from 'react-router-dom'

function Post({post}) {
  return (
    <article className="post">
      <Link className='link' to={`post/${post.id}`}>
        <h2 className='linkpt' >{post.title}</h2>
        <p className="linkpb">{post.detetime}</p>
      </Link>
      <p className="postbody">
        {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
      </p>
    </article>
  );
}

export default Post
