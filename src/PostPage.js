import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Missing from './Missing';

const PostPage = ({posts,handleDelete}) => {
  const {id}=useParams();
  const post=posts.find(post =>(post.id).toString()===id);
  return (
    <div className="postPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDete">{post.detetime}</p>
            <p className="postBody">{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
            <Link to={`/edit/${post.id}`}>
              <button className="editPost">edit</button>
            </Link>
          </>
        )}
        {!post && (
          <>
            <Missing />
          </>
        )}
      </article>
    </div>
  );
}

export default PostPage