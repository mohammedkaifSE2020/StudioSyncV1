import React from 'react'
import Element from './Element'
import Header from './Header'

function Hero() {
  return (
    <div style={{ fontFamily: 'Lastica, sans-serif' }} className=' relative mb-80'>
        <Header/>
        <div className=' flex items-center justify-between'>
            <div  className=" tracking-wider left font-bold text-7xl ml-52 text-white flex flex-col gap-5 mt-56 z-1">
                <h1>Record,</h1>
                <h1>organize, and</h1>
                <h1>collaborate</h1>
                <h1>with ease.</h1>
            </div>
            <div className="right absolute top-40 right-10">
              <Element/>
            </div>
        </div>
        
        
    </div>
  )
}

export default Hero