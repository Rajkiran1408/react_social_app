import React from 'react'
import Feed from './Feed'


function Home({posts,fetchError,isLoading}) {
  return (
    <div className="home">
      {isLoading && <p className="statusMsg">Loading Post...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoading && !fetchError && posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p className="statusMsg">No post to display</p>
      )}
    </div>
  );
}

export default Home