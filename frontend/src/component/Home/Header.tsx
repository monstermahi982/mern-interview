import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center mx-20 my-5'>
      <div className=''>
        <h3 className='text-2xl font-semibold'>Priti Technologise</h3>
      </div>
      <div>
        <ul className='flex gap-20'>
            <li className='text-xl cursor-pointer text-blue-400'>Home</li>
            <li className='text-xl cursor-pointer hover:text-blue-400'>About</li>
            <li className='text-xl cursor-pointer hover:text-blue-400'>Help</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
