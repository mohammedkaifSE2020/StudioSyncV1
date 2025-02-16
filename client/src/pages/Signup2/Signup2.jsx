import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Signup2.css'
import logo from '../../assets/logo.png'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout,login } from '../../store/UserSlice'

function Signup() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const data = location.state;
  const [success,setSuccess] = useState(false)
  const [message,setMessage] = useState("")
  const [formData,setFormData] = useState({
    name : data?.name,
    dateOfBirth : data?.dateOfBirth,
    userName : "",
    password : "",
    email : ""
  })

  
  
  const handlePage1 = ()=>{
    navigate('/Signup')
  }

  const handleOnChange = (e)=>{
    e.preventDefault();
    setFormData({
        ...formData,
        [e.target.id] : e.target.value
    })
  }

  //console.log(formData)

  const handleRegister = async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/auth/register',{
        method : 'POST',
        headers : {
           'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData),
      })
      const data = await res.json();
      
      if(data.success){
        setMessage("Registration Successfull!!,redirecting...")
        localStorage.setItem('user', JSON.stringify(data.data));
        dispatch(login(data.data))
        setSuccess(true)
        setTimeout(()=>{
          navigate('/home')
        },1000)
      }else{
        setMessage("Registration Unsuccessfull")
        dispatch(logout(data.message))
      }
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
        <p className=' tracking-widest'>Step two of two</p>
        <h1 className='box'>2</h1>
        <form>
          <div className="input flex items-center justify-between gap-5">
            <div className=' flex flex-col'>
              <p className='tracking-widest'>Choose Your Unique Identity</p>
              <input type="text" id="userName" onChange={handleOnChange} />
            </div>
            <div className='flex flex-col'>
              <p className='tracking-widest'>Enter Your Email Address</p>
              <input type="text" id="email" onChange={handleOnChange}  />
            </div>
          </div>
          <div className="input2 flex ">
            <div>
            <p className=' mt-14 ml-2 tracking-widest'>Lock It Up with a Strong Password</p>
            <input type="password" id="password" onChange={handleOnChange} />
            </div>
            <div className="buttons ml-96 tracking-widest">
              <button onClick={handlePage1}>Previous</button>
              <button onClick= {handleRegister}>Register</button>
            </div>
            
          </div>
        </form>
        <div>
            {
                data.message
            }
        </div>
      </div>
    </div>
  )
}

export default Signup