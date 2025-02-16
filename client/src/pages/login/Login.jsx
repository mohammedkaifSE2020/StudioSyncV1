import React from 'react'
import "./login.css"
import logo from '../../assets/logo.png'
import pic from '../../assets/login.jpg'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login, logout} from "../../store/UserSlice"

function Login() {
  const navigate = useNavigate()
  const [user,setUser] = useState({});
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({
    userName : "",
    password : ""
  });

  const [message,setMessage] = useState("")
  const [success,setSuccess] = useState(false)

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  
  const handleLogin = async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/auth/login',{
      method : 'POST',
      headers : {
         'Content-Type': 'application/json',
      },
      body : JSON.stringify(formData),
    })
    const data = await res.json();
    setUser(data.data)
    

    if(data.success){
      setMessage("Login Successfull!!,redirecting...")
      localStorage.setItem('user', JSON.stringify(data.data));
      setSuccess(true)
      dispatch(login(data.data));
      setTimeout(()=>{
        navigate('/home')
      },1000)
    }else{
      setMessage("Login attempt failed")
      dispatch(logout(data.data))
    }
  }
  
  
  return (
    <div className=' main flex items-center justify-center gap-20'>
      <div className="left ">
          <div className=" mb-5 ml-20">
            <img src={logo} />
          </div>
          <h1 className=' text-black font-bold text-3xl mb-20'>STUDIO SYNC</h1>
          <form className=' flex flex-col gap-5' >
            <label>Username</label>
            <input type="text" id="userName" onChange={handleChange} value={formData.userName}/>
            <label>Password</label>
            <input type="password" id="password" onChange={handleChange} value={formData.password}/>
            <button className=' font-bold text-xl' onClick={handleLogin}>Login</button>
          </form>
          {
            success ? 
            <p className=' mt-5 font-bold text-green-400 tracking-widest'>{message}</p> :
            <p className=' mt-5 font-bold text-red-400 tracking-widest'>{message}</p>
          }
      </div>
      <div className="right ">
        <img src={pic}  />
      </div>
    </div>
  )
}

export default Login