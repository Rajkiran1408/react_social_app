import React from 'react'
import { Link } from 'react-router-dom'

function Nav({search,setSearch}) {
  return (
    <div className='nav'>
      <form className='searchForm' onSubmit={(e)=>{e.preventDefault()}}>
        <label htmlFor="serach">serach Post</label>
        <input 
        type="text"
          placeholder='Search Post'
          id='search'
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
        />
      </form>
      <ul>
        <li><Link className='link' to='/'>Home</Link></li>
        <li><Link className='link' to='post'>Post</Link></li>
        <li><Link className='link' to='about'>About</Link></li>
      </ul>
    </div>
  )
}

export default Nav