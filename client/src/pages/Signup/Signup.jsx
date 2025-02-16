import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Signup.css'
import logo from '../../assets/logo.png'
import {useNavigate} from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [data,setData] = useState({
    name : "",
    dateOfBirth : ""
  })

  const handleOnChange = (e)=>{
    setData({
      ...data,
      [e.target.id] : e.target.value
    })
  }
  //console.log(data)
  const handlePage2 = (e)=>{
    e.preventDefault()
    navigate('/Signup2',{state:data})
  }
  return (
    <div className='main '>
      <header className=' flex items-center justify-evenly p-2 w-full h-20 pt-16 font-bold'>
        <div className="logo flex items-center justify-between gap-5">
          <img src={logo} className=' h-20 w-20'/>
          <h1 className='tracking-widest'>STUDIO SYNC</h1>
        </div>
        <ul className='flex items-center justify-evenly gap-10 tracking-widest'>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
        <div className="login">
        <Link to="/login">
          <button className=' w-32 h-10 tracking-widest'>Login</button>
        </Link>
        </div>
      </header>
      <div className="register mt-20 mx-10 ml-36 mr-36">
        <h1 className=' font-bold text-2xl my-5 tracking-widest'>New User Registration</h1>
        <p className=' tracking-widest'>Step one of two</p>
        <h1 className='box'>1</h1>
        <form onSubmit={handlePage2}>
          <div className="input flex items-center justify-between gap-5">
            <div className=' flex flex-col'>
              <p className='tracking-widest'>What Should We Call You?</p>
              <input type="text" id="name" onChange={handleOnChange} />
            </div>
            <div className='flex flex-col'>
              <p className='tracking-widest'>What’s Your Birthday?</p>
              <input type="date" name="" id="dateOfBirth" onChange={handleOnChange}  />
            </div>
          </div>
          <div className="input2 flex ">
            <div>
            <p className=' mt-14 ml-2 tracking-widest'>Describe Yourself to the World</p>
            <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Write a brief description about yourself..."
            />
            </div>
            <div className="buttons ml-96 tracking-widest">
              <button type='button'>Cancel</button>
              <button type='submit'>Continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup