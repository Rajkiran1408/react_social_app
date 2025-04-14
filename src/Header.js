import React from 'react'
import {FaLaptop,FaMobileAlt,FaTabletAlt} from 'react-icons/fa'
function Header({title,width}) {
  return (
    <div className='header'>
      <div className='logo'>RSM</div>
      <h1>{title}</h1>
      {width<768? <FaMobileAlt />:width <992 ? <FaTabletAlt />:<FaLaptop />}
    </div>
  )
}

export default Header