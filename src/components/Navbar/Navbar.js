import React from 'react'
import { Link } from 'react-router-dom'
import image from './image.png'

function Navbar() {
  return (
    <div className='h-[4rem] bg-[#f9f9f9] text-black flex justify-center sm:justify-between items-center pr-10'>
      <div className='text-3xl  font-bold pl-16'> <img src={image} className='h-10' alt='kletech'></img>   </div>

    </div>
  )
}

export default Navbar