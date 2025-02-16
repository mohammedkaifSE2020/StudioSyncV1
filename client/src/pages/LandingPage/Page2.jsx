import React from 'react'
import Element2 from './Element2'
import { useNavigate } from 'react-router-dom'

function Page2() {
  const navigate = useNavigate();
  const handleClick = (text)=>{
    navigate(`${text}`)
  }
  return (
    <div className=' relative mb-0'>
      <div>
          <h1 style={{ color: "#d73cbe" }} className=' ml-52 text-4xl mb-10'>YOU CAN COUNT ON US.</h1>
          <div className=' flex items-center justify-between'>
              <div  className=" tracking-wider left font-bold text-5xl ml-52 text-white flex flex-col gap-5 ">
                  <h1>Start</h1>
                  <h1>recording and</h1>
                  <h1>organizing your</h1>
                  <h1>workspace today!</h1>
              </div> 
              <div className="right flex items-center justify-around mr-36">
                  <button onClick={() => handleClick("login")}  className='p-5 m-3 w-56 h-20 rounded-full text-black text-3xl hover:text-red-500 hover:bg-slate-50'>Login</button>
                  <button onClick={() => handleClick("signup")} className='p-5 m-2 w-56 h-20 rounded-full text-black text-3xl hover:text-red-500 hover:bg-slate-50'>Sign Up</button>
              </div>
          </div>
      </div> 
    </div>
  )
}

export default Page2