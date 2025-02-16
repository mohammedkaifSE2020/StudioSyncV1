import React,{useState,useEffect} from 'react'
import pic from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import './Workspace.css'


function Workspace() {
  const [teams,setTeams] = useState([])
  useEffect(async()=>{
    const response = await fetch('')
    setTeams(response.teams)
  },[])
  
  return (
    <div>
      <div className="header flex items-center justify-start gap-10 ml-10 mt-10">
        <img src={pic} alt="Logo" />
        <h1 className="font-bold text-black text-3xl mx-1 tracking-wider">STUDIO SYNC</h1>
        <div className="menu">
          <ul className=" ml-96 header flex items-center justify-start gap-10 ml-10 mt-10 text-2xl font-bold">
            <Link to={'/workspace'}>
              <li>Create Team</li>
            </Link>
            <Link to={'/logout'}>
              <li>Logout</li>
            </Link>
          </ul>
        </div>
      </div>
      <h1 className='heading'>Teams</h1>
    </div>
  )
}

export default Workspace