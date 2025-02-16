import React from 'react'
import logo from '../../assets/logo.png'
import '../../index.css'

function Header() {
  return (
    <div>
        <header className=' main-header flex justify-start items-start  gap-5 fixed z-10'>
            <img src={logo} className=' h-36 w-36 p-2 ml-10 mt-11'/>
            <h1 className=' font-bold text-3xl pl-3 pt-24 text-white'>Studio Sync.</h1>
        </header>
    </div>
  )
}

export default Header